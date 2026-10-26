from fastapi import FastAPI, HTTPException
from database import engine, Base, SessionLocal
import models
import schemas
from JWT import router as jwt_router

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(jwt_router)

@app.post("/jugadores", response_model=schemas.JugadorRespuesta)
def crear_jugador(jugador: schemas.JugadorCrear):
    db = SessionLocal()
    try:
        nuevo_jugador = models.JugadorDB(**jugador.dict())
        db.add(nuevo_jugador)
        db.commit()
        db.refresh(nuevo_jugador)
        return nuevo_jugador
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))
    finally:
        db.close()

@app.get("/jugadores")
def obtener_jugadores():
    db = SessionLocal()
    try:
        jugadores = db.query(models.JugadorDB).all()
        return jugadores
    finally:
        db.close()