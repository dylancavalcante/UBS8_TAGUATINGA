from fastapi import APIRouter, Depends, UploadFile, File, Form
from sqlalchemy.orm import Session
import shutil
import uuid

from app.database.deps import get_db

from app.controllers.horta_controller import (
    criar_planta,
    listar_plantas
)

from app.schemas.horta_schema import HortaCreate

router = APIRouter(
    prefix="/horta",
    tags=["Horta"]
)

@router.get("/")
def get_horta(
    db: Session = Depends(get_db)
):

    return listar_plantas(db)


@router.post("/")
async def create_horta(

    nome: str = Form(...),
    nome_cientifico: str = Form(...),
    descricao: str = Form(...),
    modo_de_uso: str = Form(...),
    contraindicacoes: str = Form(...),
    efeitos: str = Form(...),

    imagem: UploadFile = File(None),

    db: Session = Depends(get_db)

):

    imagem_url = None

    if imagem:

        extensao = imagem.filename.split(".")[-1]

        nome_arquivo = f"{uuid.uuid4()}.{extensao}"

        caminho_arquivo = f"uploads/plantas/{nome_arquivo}"

        with open(caminho_arquivo, "wb") as buffer:
            shutil.copyfileobj(imagem.file, buffer)

        imagem_url = f"/uploads/plantas/{nome_arquivo}"

    dados = HortaCreate(

        nome=nome,
        nome_cientifico=nome_cientifico,
        descricao=descricao,
        modo_de_uso=modo_de_uso,
        contraindicacoes=contraindicacoes,
        efeitos=efeitos,
        imagem_horta_url=imagem_url

    )

    return criar_planta(db, dados)