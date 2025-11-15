from datetime import datetime, timedelta
from jose import jwt, JWTError
from passlib.context import CryptContext
from fastapi import HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from database.db import SessionLocal
from database.models import User
import os
from dotenv import load_dotenv

load_dotenv()

SECRET = os.getenv("SECRET_KEY", "change-this-key")
ALGORITHM = "HS256"
ACCESS_EXPIRE_MIN = 120

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


def hash_password(password: str):
    return pwd_context.hash(password[:72])


def verify_password(password: str, hashed: str):
    return pwd_context.verify(password[:72], hashed)


def create_token(username: str, role: str):
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_EXPIRE_MIN)
    return jwt.encode(
        {"sub": username, "role": role, "exp": expire},
        SECRET,
        algorithm=ALGORITHM,
    )


def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET, algorithms=[ALGORITHM])
        username = payload.get("sub")
        if username is None:
            raise HTTPException(401, "Invalid token")

        db = SessionLocal()
        user = db.query(User).filter(User.username == username).first()
        if not user:
            raise HTTPException(401, "User not found")
        return user

    except JWTError:
        raise HTTPException(401, "Invalid token")


def require_role(role: str):
    def checker(user: User = Depends(get_current_user)):
        if user.role != role:
            raise HTTPException(403, "Forbidden: insufficient role")
        return user
    return checker
