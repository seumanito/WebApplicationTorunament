from pydantic import BaseModel

class TorneoCrear(BaseModel):
    nombre: str
    juego: str

class TorneoRespuesta(BaseModel):
    id: int
    nombre: str
    juego: str

    class Config:
        orm_mode = True

class Login(BaseModel):
    username: str
    password: str

class UserRegister(BaseModel):
    username: str
    password: str
    role: str = "user"

class InscripcionRequest(BaseModel):
    team_id: str