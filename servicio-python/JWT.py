from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from datetime import datetime, timedelta
import jwt

router = APIRouter()

SECRET_KEY = "1234"
ALGORITHM = "HS256"

class Login(BaseModel):
    username: str
    password: str

User_data = {
    "admin": {"password": "admin123", "role": "admin"},
    "user1": {"password": "password1", "role": "user"}
}

@router.post("/login")
def login(login: Login):
    user = User_data.get(login.username)
    if not user or user["password"] != login.password:
        raise HTTPException(status_code=401, detail="Credenciales incorrectas")
    
    payload = {
        "sub": login.username,
        "role": user["role"],
        "exp": datetime.utcnow() + timedelta(hours=8)
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
    return {"access_token": token, "token_type": "bearer", "role": user["role"]}