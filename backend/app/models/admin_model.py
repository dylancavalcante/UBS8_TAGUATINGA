from sqlalchemy import Column, Integer, String
from app.database.base import Base

class Admin(Base):

    __tablename__ = "admins"

    admin_id = Column(Integer, primary_key=True, index=True)
    usuario = Column(String, unique=True, nullable=False)
    senha = Column(String, nullable=False)