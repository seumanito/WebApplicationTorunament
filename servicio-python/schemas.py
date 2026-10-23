from pydantic import BaseModel

class JugadorCrear(BaseModel):
    nombre: str
    equipo: str

class JugadorRespuesta(BaseModel):
    id: int 
    nombre: str
    equipo: str

    class Config:
        orm_mode = True