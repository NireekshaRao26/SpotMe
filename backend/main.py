from fastapi import FastAPI
from routes.auth_routes import router as auth_router
from routes.event_routes import router as event_router
from routes.photo_routes import router as image_router
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles


app = FastAPI()

app.include_router(auth_router)
app.include_router(event_router)
app.include_router(image_router)


# CORS
app.add_middleware(
  CORSMiddleware,
  allow_origins=["http://localhost:5173"],  # add your front-end origin(s)
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

# Serve uploaded images
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")
