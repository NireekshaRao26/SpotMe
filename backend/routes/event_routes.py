from fastapi import APIRouter, Form, Depends, HTTPException
from database.db import get_db
from database.models import Event, Photo
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
