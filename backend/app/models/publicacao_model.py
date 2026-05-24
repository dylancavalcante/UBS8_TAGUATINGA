from sqlalchemy import Column, Integer, String, Text, ForeignKey
from app.database.base import Base

class Publicacao(Base):

    __tablename__ = "publicacoes"

    publicacao_id = Column(Integer, primary_key=True, index=True)
    titulo = Column(String, nullable=False)
    resumo = Column(Text)
    conteudo = Column(Text)
    categoria = Column(String)
    imagem_url = Column(String)

    admin_id = Column(Integer, ForeignKey("admins.admin_id"))