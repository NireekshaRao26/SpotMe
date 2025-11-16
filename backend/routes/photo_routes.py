from fastapi import APIRouter, UploadFile, File, Form, Depends, HTTPException
import os, uuid, shutil
from database.db import SessionLocal
from database.models import Photo, Event
from auth.utils import require_role
from ml.face_utils import get_face_embeddings
from ml.qdrant_store import store_embeddings_in_qdrant
from ml.qdrant_search import search_similar_faces

router = APIRouter(prefix="/photos", tags=["photos"])

UPLOAD_DIR = "uploads"
TEMP_DIR = "temp"
os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(TEMP_DIR, exist_ok=True)

@router.post("/upload")
async def upload_photo(
    event_code: str = Form(...),
    file: UploadFile = File(...),
    user = Depends(require_role("photographer")),
):
    from fastapi import HTTPException
    db = SessionLocal()

    try:
        event = db.query(Event).filter(Event.event_code == event_code).first()
        if not event:
            raise HTTPException(status_code=404, detail="Invalid event code")

        safe_name = f"{uuid.uuid4().hex}_{file.filename}"

        event_folder = os.path.join(UPLOAD_DIR, event_code)
        os.makedirs(event_folder, exist_ok=True)

        file_path = os.path.join(event_folder, safe_name)

        with open(file_path, "wb") as out:
            shutil.copyfileobj(file.file, out)

        embeddings = get_face_embeddings(file_path)

        if not embeddings:
            raise HTTPException(status_code=400, detail="No faces detected in the image")

        store_embeddings_in_qdrant(embeddings, safe_name, event_code)

        photo = Photo(
            event_code=event_code,
            uploader_id=user.id,
            image_name=safe_name,
            file_url=file_path
        )

        db.add(photo)
        db.commit()

        return {
            "message": "Photo uploaded",
            "faces_detected": len(embeddings),
            "image_name": safe_name,
        }

    except HTTPException as e:
        raise e

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        db.close()

@router.post("/search")
async def search_photo(
    event_code: str = Form(...),
    file: UploadFile = File(...),
):
    temp_path = os.path.join(TEMP_DIR, f"{uuid.uuid4().hex}_{file.filename}")
    with open(temp_path, "wb") as out:
        out.write(await file.read())

    embeddings = get_face_embeddings(temp_path)
    if not embeddings:
        os.remove(temp_path)
        return {"message": "No face found in the uploaded image"}

    results = search_similar_faces(embeddings, event_code)
    os.remove(temp_path)
    return {"message": f"Search completed for {event_code}", "results": results}


@router.get("/list/{event_code}")
def list_event_photos(event_code: str, user = Depends(require_role("host"))):
    db = SessionLocal()
    try:
        rows = db.query(Photo).filter(Photo.event_code == event_code).all()
        return [
            {
                "image_name": r.image_name,
                "file_url": r.file_url,
                "uploaded_at": r.uploaded_at
            }
            for r in rows
        ]
    finally:
        db.close()
