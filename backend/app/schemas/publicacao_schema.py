from pydantic import BaseModel


class PublicacaoCreate(BaseModel):

    titulo: str
    resumo: str
    conteudo: str
    categoria: str
    imagem_url: str