from fastapi import FastAPI
from routes.auth_routes import router as auth_router
from routes.event_routes import router as event_router
from routes.photo_routes import router as image_router

app = FastAPI()

app.include_router(auth_router)
app.include_router(event_router)
app.include_router(image_router)
