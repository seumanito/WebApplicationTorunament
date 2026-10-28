from sqlalchemy import Column, Integer, String
from database import Base

class TorneoDB(Base):
    __tablename__ = "torneos"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, index=True)
    juego = Column(String)

class Inscripcion(Base):
    __tablename__ = "inscripciones"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    torneo_id = Column(Integer, nullable=False)
    team_id = Column(String, nullable=False)
    estado = Column(String, default="pendiente")