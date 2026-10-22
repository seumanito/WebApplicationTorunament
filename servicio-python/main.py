from fastapi import FastAPI
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import declarative_base, Session

DATABASE_URL = "sqlite:///torneo.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
Base = declarative_base()

class JugadorDB(Base):
    __tablename__ = "jugadores"
    id = Column(Integer, primary_key=True, autoincrement=True)
    nombre = Column(String, nullable=False)
    equipo = Column(String, nullable=False)

Base.metadata.create_all(bind=engine)

class Jugador(BaseModel):
    nombre: str
    equipo: str

app = FastAPI()

@app.post("/jugadores")
def inscribir_jugador(participante: Jugador):
    db=Session(engine)
    try:
        jugador_guardar=JugadorDB(nombre=participante.nombre,equipo=participante.equipo)
        db.add(jugador_guardar)
        db.commit() 
        return {"mensaje": "Jugador Guardado"}
    finally:
        db.close()

@app.get("/jugadores")
def ver_jugadores():
    db=Session(engine)
    try:
        jugadores = db.query(JugadorDB).all()
        return {"jugadores": jugadores}
    finally:
        db.close()