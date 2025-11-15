from fastapi import APIRouter, Form, Depends, HTTPException
from database.db import SessionLocal
from database.models import Event
from auth.utils import require_role
import random, string

router = APIRouter(prefix="/events", tags=["events"])

def generate_event_code():
    return "EVT-" + "".join(random.choices(string.ascii_uppercase + string.digits, k=6))

@router.post("/create")
def create_event(name: str = Form(...), user = Depends(require_role("host"))):
    db = SessionLocal()
    try:
        code = generate_event_code()
        evt = Event(event_code=code, name=name, created_by=user.id)
        db.add(evt)
        db.commit()
        return {"message": "event created", "event_code": code}
    finally:
        db.close()

@router.get("/list")
def list_events(user = Depends(require_role("host"))):
    db = SessionLocal()
    try:
        events = db.query(Event).filter(Event.created_by == user.id).all()
        return [{"event_code": e.event_code, "name": e.name} for e in events]
    finally:
        db.close()
