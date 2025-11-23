from fastapi import APIRouter, HTTPException, Form, Depends
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from database.db import get_db
from database.models import User
from auth.utils import hash_password, verify_password, create_token


router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register")
def register(
    username: str = Form(...),
    password: str = Form(...),
    role: str = Form(...),
    db: Session = Depends(get_db)
):
    allowed = ("host", "photographer", "participant")
    if role not in allowed:
        raise HTTPException(status_code=400, detail=f"role must be one of {allowed}")

    if db.query(User).filter(User.username == username).first():
        raise HTTPException(status_code=400, detail="Username already exists")

    user = User(username=username, password_hash=hash_password(password), role=role)
    db.add(user)
    db.commit()

    return {"message": "registered", "username": username, "role": role}


@router.post("/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(User.username == form_data.username).first()

    if not user or not verify_password(form_data.password, user.password_hash):
        raise HTTPException(status_code=400, detail="Invalid username or password")

    token = create_token(user.username, user.role)

    return {"access_token": token, "token_type": "bearer", "role": user.role}


@router.post("/logout")
def logout():
    return {"message": "Logged out successfully"}
