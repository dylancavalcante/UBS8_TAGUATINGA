from pydantic import BaseModel


class HortaCreate(BaseModel):

    nome: str

    nome_cientifico: str

    descricao: str

    modo_de_uso: str

    contraindicacoes: str

    efeitos: str

    imagem_horta_url: str | None = None

    #admin_id: int