from fastapi import FastAPI
from routes import image_routes

app = FastAPI(
    title="SpotMe Backend API",
    description="AI-based photo retrieval system using face recognition",
    version="1.0"
)

app.include_router(image_routes.router)

@app.get("/")
def home():
    return {"message": "Welcome to SpotMe API"}
