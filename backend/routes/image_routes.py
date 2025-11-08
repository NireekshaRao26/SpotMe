from fastapi import APIRouter, UploadFile, File
import shutil
import os
import uuid
from fastapi import Form
from ml.face_utils import get_face_embeddings
from ml.qdrant_store import store_embeddings_in_qdrant
from ml.qdrant_search import search_similar_faces

router = APIRouter()

UPLOAD_DIR = "uploads"
TEMP_DIR = "temp"

os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(TEMP_DIR, exist_ok=True)

@router.post("/upload")
async def upload_image(
    event_name: str = Form(...),
    file: UploadFile = File(...)
):
    os.makedirs(UPLOAD_DIR, exist_ok=True)
    file_path = os.path.join(UPLOAD_DIR, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    embeddings = get_face_embeddings(file_path)
    if not embeddings:
        return {"error": "No faces detected"}

    store_embeddings_in_qdrant(embeddings, file.filename, event_name)

    return {
        "message": f"Image uploaded successfully for {event_name}",
        "faces_detected": len(embeddings),
        "event_name": event_name
    }

from fastapi import Form

@router.post("/search")
async def search_face(
    event_name: str = Form(...),
    file: UploadFile = File(...)
):
    os.makedirs(TEMP_DIR, exist_ok=True)
    temp_image_path = os.path.join(TEMP_DIR, f"{uuid.uuid4()}_{file.filename}")

    with open(temp_image_path, "wb") as buffer:
        buffer.write(await file.read())

    embeddings = get_face_embeddings(temp_image_path)
    if not embeddings:
        return {"message": "No face found in the uploaded image"}

    from ml.qdrant_search import search_similar_faces
    results = search_similar_faces(embeddings, event_name)

    os.remove(temp_image_path)

    return {
        "message": f"Search completed for {event_name}",
        "results": results
    }
