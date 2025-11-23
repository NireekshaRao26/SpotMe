from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from .db import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    username = Column(String, unique=True, index=True)
    password_hash = Column(String)
    role = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class Event(Base):
    __tablename__ = "events"

    id = Column(Integer, primary_key=True)
    event_code = Column(String, unique=True, index=True)
    name = Column(String)
    created_by = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())  # ✅ ADD THIS

    creator = relationship("User")



class Photo(Base):
    __tablename__ = "photos"

    id = Column(Integer, primary_key=True)
    event_code = Column(String, index=True)
    uploader_id = Column(Integer, ForeignKey("users.id"))
    image_name = Column(String)
    file_url = Column(String)
    uploaded_at = Column(DateTime(timezone=True), server_default=func.now())

    uploader = relationship("User")
