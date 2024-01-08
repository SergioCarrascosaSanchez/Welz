from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
import crud
import schemas
import models
from database import SessionLocal, engine
import logging
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

models.Base.metadata.create_all(bind=engine)

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/signup")
def create_user(credentials: schemas.SignupCredentials, db: Session = Depends(get_db)):
    user_data = crud.create_user(credentials, db)
    if(user_data):
        id = user_data[0].id
        token = user_data[1]
        return {
            "localId": id,
            "email": credentials.email,
            "idToken": token,
        }
    else:
        raise HTTPException(status_code=404, detail='EMAIL_EXISTS')

@app.post("/login")
def login_user(credentials: schemas.Credentials, db: Session = Depends(get_db)):
    user_data = crud.login_user(credentials, db) 
    if(user_data):
        id = user_data[0].id
        token = user_data[1]
        return {
            "localId": id,
            "email": credentials.email,
            "idToken": token,
        }
    else:
        raise HTTPException(status_code=404, detail='INVALID_LOGIN_CREDENTIALS')

@app.get("/{id}")
def read_user_data(id: str,
                   auth: str | None = None,
                   db: Session = Depends(get_db)):
    user_data = crud.get_data(id, db, auth)
    if(user_data):
        return user_data.data
    else:
        raise HTTPException(status_code=401)

@app.put("/{id}")
def update_user_data(id: str, 
                     new_data: dict, 
                     auth: str | None = None, 
                     db: Session = Depends(get_db)):
    user_data = crud.update_data(id, new_data, db, auth)
    if(user_data):
        return
    else:
        raise HTTPException(status_code=401)