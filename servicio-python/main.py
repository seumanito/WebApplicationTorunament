from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy.orm import Session
from database import engine, Base, SessionLocal, get_db 
import models
import schemas
from schemas import UserRegister, InscripcionRequest
from JWT import router as jwt_router
import httpx

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(jwt_router)

@app.post("/torneos", response_model=schemas.TorneoRespuesta)
def create_tournament(torneo: schemas.TorneoCrear):
    db = SessionLocal()
    try:
        new_tournament = models.TorneoDB(**torneo.dict())
        db.add(new_tournament)
        db.commit()
        db.refresh(new_tournament)
        return new_tournament
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))
    finally:
        db.close()

@app.get("/torneos")
def get_tournaments():
    db = SessionLocal()
    try:
        return db.query(models.TorneoDB).all()
    finally:
        db.close()

@app.post("/torneos/{torneo_id}/inscribir")
def solicitar_inscripcion(torneo_id: int, inscripcion: InscripcionRequest, db: Session = Depends(get_db)):
    nueva_solicitud = models.Inscripcion(
        torneo_id=torneo_id,
        team_id=inscripcion.team_id,
        estado="pendiente"
    )
    
    db.add(nueva_solicitud)
    db.commit()
    db.refresh(nueva_solicitud)
    
    return {
        "message": "Solicitud de inscripcion enviada con exito", 
        "solicitud": {
            "id": nueva_solicitud.id,
            "torneo_id": nueva_solicitud.torneo_id,
            "team_id": nueva_solicitud.team_id,
            "estado": nueva_solicitud.estado
        }
    }

@app.get("/inscripciones/pendientes")
def listar_pendientes(db: Session = Depends(get_db)):
    pendientes = db.query(models.Inscripcion).filter(models.Inscripcion.estado == "pendiente").all()
    return pendientes

@app.put("/inscripciones/{inscripcion_id}/aprobar")
def aprobar_inscripcion(inscripcion_id: int, db: Session = Depends(get_db)):
    inscripcion = db.query(models.Inscripcion).filter(models.Inscripcion.id == inscripcion_id).first()
    
    if not inscripcion:
        raise HTTPException(status_code=404, detail="Inscripcion no encontrada")
    
    inscripcion.estado = "aprobado"
    db.commit()
    db.refresh(inscripcion)

    
    try:
        response = httpx.post("http://servicio-go:8080/equipos", json={
            "team_id": inscripcion.team_id,
            "torneo_id": inscripcion.torneo_id
        }, timeout=5.0)
        
        go_status = "Sincronizado con Go exitosamente" if response.status_code == 200 else "Aprobado en Python, pero Go no respondió OK"
    except Exception as e:
        go_status = f"Aprobado localmente, error al contactar Go: {str(e)}"
    
    return {
        "message": f"Inscripción {inscripcion_id} aprobada exitosamente", 
        "estado": inscripcion.estado,
        "go_sync": go_status
    }