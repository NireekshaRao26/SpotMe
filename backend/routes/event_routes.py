from fastapi import APIRouter, Form, Depends, HTTPException
from database.db import get_db
from database.models import Event, Photo, SearchHistory

from sqlalchemy.orm import Session
from auth.utils import require_role
import random, string
from sqlalchemy.sql import func

router = APIRouter(prefix="/events", tags=["events"])


def generate_event_code():
    return "EVT-" + "".join(random.choices(string.ascii_uppercase + string.digits, k=6))


@router.post("/create")
def create_event(
    name: str = Form(...),
    user=Depends(require_role("host")),
    db: Session = Depends(get_db)
):
    code = generate_event_code()
    evt = Event(event_code=code, name=name, created_by=user.id)
    db.add(evt)
    db.commit()
    return {"message": "event created", "event_code": code}


@router.get("/list")
def list_events(
    user=Depends(require_role("host")),
    db: Session = Depends(get_db)
):
    events = db.query(Event).filter(Event.created_by == user.id).all()
    return [
        {
            "event_code": e.event_code,
            "name": e.name,
            "created_at": e.created_at
        }
        for e in events
    ]


@router.get("/stats")
def host_stats(
    user=Depends(require_role("host")),
    db: Session = Depends(get_db)
):
    events = db.query(Event).filter(Event.created_by == user.id).all()

    total_events = len(events)
    total_photos = 0
    last_event = None

    if total_events > 0:
        event_codes = [e.event_code for e in events]

        total_photos = db.query(Photo).filter(
            Photo.event_code.in_(event_codes)
        ).count()

        last_event = max(events, key=lambda e: e.created_at)

    return {
        "total_events": total_events,
        "total_photos": total_photos,
        "last_event": {
            "name": last_event.name if last_event else None,
            "created_at": last_event.created_at if last_event else None,
        },
    }

@router.get("/overview/{event_code}")
def event_overview(
    event_code: str,
    user=Depends(require_role("host")),
    db: Session = Depends(get_db)
):

    event = db.query(Event).filter(Event.event_code == event_code).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")

    photos = db.query(Photo).filter(Photo.event_code == event_code).all()

    total_photos = len(photos)

    # Photos uploaded today
    photos_today = (
        db.query(Photo)
        .filter(
            Photo.event_code == event_code,
            func.date(Photo.uploaded_at) == func.current_date()
        )
        .count()
    )

    # Recent 4 photos
    recent_photos = [
        {
            "image_name": p.image_name,
            "file_url": f"/uploads/{event_code}/{p.image_name}",
            "uploaded_at": p.uploaded_at
        }
        for p in sorted(photos, key=lambda x: x.uploaded_at, reverse=True)[:4]
    ]

    # Photographer stats
    photographer_stats = {}
    for p in photos:
        photographer_stats[p.uploader_id] = (
            photographer_stats.get(p.uploader_id, 0) + 1
        )

    return {
        "event_code": event.event_code,
        "event_name": event.name,
        "created_at": event.created_at,
        "total_photos": total_photos,
        "photos_today": photos_today,
        "recent_photos": recent_photos,
        "photographer_stats": photographer_stats
    }

@router.delete("/delete/{event_code}")
def delete_event(event_code: str, user = Depends(require_role("host")), db: Session = Depends(get_db)):
    event = db.query(Event).filter(Event.event_code == event_code, Event.created_by == user.id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")

    # Delete photos for this event
    db.query(Photo).filter(Photo.event_code == event_code).delete()

    # Delete event folder from uploads
    import shutil, os
    folder_path = f"uploads/{event_code}"
    if os.path.exists(folder_path):
        shutil.rmtree(folder_path)

    # Delete event
    db.delete(event)
    db.commit()

    return {"message": "Event deleted successfully"}

@router.get("/participant/profile")
def participant_profile(user=Depends(require_role("participant")), db: Session = Depends(get_db)):

    # total search count
    total_searches = db.query(SearchHistory).filter(SearchHistory.user_id == user.id).count()

    return {
        "username": user.username,
        "role": user.role,
        "joined_at": user.created_at,
        "total_searches": total_searches
    }

@router.get("/participant/recent-searches")
def recent_searches(user=Depends(require_role("participant")), db: Session = Depends(get_db)):

    rows = (
        db.query(SearchHistory)
        .filter(SearchHistory.user_id == user.id)
        .order_by(SearchHistory.searched_at.desc())
        .limit(3)
        .all()
    )

    return [
        {
            "event_code": r.event_code,
            "searched_at": r.searched_at
        }
        for r in rows
    ]
