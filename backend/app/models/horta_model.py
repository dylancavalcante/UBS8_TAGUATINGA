from sqlalchemy import Column, Integer, String, Text
from app.database.base import Base

class PublicacaoHorta(Base):

    __tablename__ = "publicacoes_horta"

    horta_id = Column(Integer, primary_key=True, index=True)
    nome = Column(String, nullable=False)
    nome_cientifico = Column(String, nullable=False)
    descricao = Column(Text, nullable=True)
    modo_de_uso = Column(Text, nullable=True)
    contraindicacoes = Column(Text, nullable=False)
    efeitos = Column(Text, nullable=False)
    imagem_horta_url = Column(Text, nullable=True)
    admin_id = Column(Integer, nullable=False)