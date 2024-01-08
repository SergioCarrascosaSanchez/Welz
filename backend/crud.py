from sqlalchemy.orm import Session
from passlib.context import CryptContext
import models
import schemas
from jwt_service import create_access_token, decode_access_token
from datetime import timedelta

ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def create_user(credentials: schemas.SignupCredentials, db: Session):
    existing_email = db.query(models.UserData).filter(models.UserData.email == credentials.email).first()
    print(existing_email)
    if(existing_email):
        return None
    else:
        db_user = models.UserData(username= credentials.username, 
                                password = pwd_context.hash(credentials.password), 
                                email = credentials.email, 
                                data={"username": credentials.username})
        
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        token = create_access_token(
            data={"sub": db_user.email}, 
            expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        )
        return db_user, token

def login_user(credentials: schemas.Credentials, db: Session):
    user_data = db.query(models.UserData).filter(models.UserData.email == credentials.email).first()
    if(user_data and pwd_context.verify(credentials.password, user_data.password)):
        token = create_access_token(
            data={"sub": user_data.email}, 
            expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        )
        return user_data, token
    else:
        return None

def get_data(id: int, db: Session, auth: str):
    user_data = db.query(models.UserData).filter(models.UserData.id == id).first()
    if(auth and decode_access_token(auth, user_data.email)):
        return user_data
    else:
        return None

def update_data(id, new_data: dict, db: Session, auth: str):
    user_data = db.query(models.UserData).filter(models.UserData.id == id).first()
    if(auth and decode_access_token(auth, user_data.email)):
        user_data.data = new_data
        db.commit()
        return user_data
    else:
        return None