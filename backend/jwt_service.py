from jose import JWTError, jwt
from datetime import datetime, timedelta
import os

ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, os.environ.get("SECRET_KEY"), algorithm=ALGORITHM)
    return encoded_jwt

def decode_access_token(token: str, email: str):
    try:
        payload = jwt.decode(token, os.environ.get("SECRET_KEY"), algorithms=[ALGORITHM])
    except JWTError:
        return False
    return payload["sub"] == email