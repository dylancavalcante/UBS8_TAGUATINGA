from pydantic import BaseModel
from datetime import datetime

class PublicacaoCreate(BaseModel):

    titulo: str
    resumo: str
    conteudo: str
    categoria: str
    imagem_url: str


class PublicacaoResponse(BaseModel):

    publicacao_id: int
    titulo: str
    resumo: str
    conteudo: str
    categoria: str
    imagem_url: str
    criado_em: datetime

    class Config:
        from_attributes = True