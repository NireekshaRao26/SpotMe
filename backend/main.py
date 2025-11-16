from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from routes.auth_routes import router as auth_router
from routes.event_routes import router as event_router
from routes.photo_routes import router as image_router
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os


app = FastAPI()

app.include_router(auth_router)
app.include_router(event_router)
app.include_router(image_router)

app.add_middleware(
  CORSMiddleware,
  allow_origins=["http://localhost:5173"],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

@app.get("/download/{event_code}/{image_name}")
def download_image(event_code: str, image_name: str):
    file_path = f"uploads/{event_code}/{image_name}"
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="File not found")
    return FileResponse(file_path, filename=image_name, media_type="application/octet-stream")
