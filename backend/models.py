from sqlalchemy import Column, JSON, text, String
from database import Base

class UserData(Base):
    __tablename__ = "user_data"

    id = Column(String, primary_key=True, default=text("lower(hex(randomblob(4))) || '-' || lower(hex(randomblob(2))) || '-4' || substr(lower(hex(randomblob(2))),2) || '-a' || substr(lower(hex(randomblob(2))),2) || '-6' || substr(lower(hex(randomblob(6))),2)"), unique=True, nullable=False)
    password = Column(String, nullable=False)
    email = Column(String, nullable=False, unique=True)
    username = Column(String, nullable=False)
    data = Column(JSON, nullable=False)
