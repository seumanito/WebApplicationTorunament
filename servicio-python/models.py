from sqlalchemy import Column, Integer, String
from database import Base

class JugadorDB(Base):
    __tablename__ = "jugadores"
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, index=True)
    nombre = Column(String, nullable=False)
    equipo = Column(String, nullable=False)