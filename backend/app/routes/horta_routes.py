from fastapi import APIRouter, Depends, UploadFile, File, Form
from sqlalchemy.orm import Session
import shutil
import uuid
import os
import cloudinary.uploader

from app.core.cloudinary_config import *

from fastapi import HTTPException
from app.database.deps import get_db
from app.models.horta_model import PublicacaoHorta
from app.core.security import verificar_token

from app.controllers.horta_controller import (
    criar_planta,
    listar_plantas
)

from app.schemas.horta_schema import HortaCreate

router = APIRouter(
    prefix="/horta",
    tags=["Horta"]
)

UPLOAD_DIR = "uploads/plantas"

os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.get("/")
def get_horta(
    db: Session = Depends(get_db)
):

    return listar_plantas(db)


@router.post("/")
async def create_horta(

    usuario = Depends(verificar_token),
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

        caminho_arquivo = os.path.join(
            UPLOAD_DIR,
            nome_arquivo
        )

        resultado = cloudinary.uploader.upload(
            imagem.file,
            folder="horta"
        )

        imagem_url = resultado["secure_url"]

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

@router.delete("/{horta_id}")
def deletar_horta(
    horta_id: int,
    usuario = Depends(verificar_token),
    db: Session = Depends(get_db)
):

    planta = db.query(PublicacaoHorta).filter(
        PublicacaoHorta.horta_id == horta_id
    ).first()

    if not planta:

        raise HTTPException(
            status_code=404,
            detail="Planta não encontrada"
        )

    db.delete(planta)

    db.commit()

    return {
        "mensagem": "Planta removida com sucesso"
    }

@router.put("/{horta_id}")
async def editar_horta(
    horta_id: int,
    usuario = Depends(verificar_token),
    nome: str = Form(...),
    nome_cientifico: str = Form(...),
    descricao: str = Form(...),
    modo_de_uso: str = Form(...),
    contraindicacoes: str = Form(...),
    efeitos: str = Form(...),
    imagem: UploadFile = File(None),
    db: Session = Depends(get_db)
):

    planta = db.query(PublicacaoHorta).filter(
        PublicacaoHorta.horta_id == horta_id
    ).first()

    if not planta:
        return {"erro": "Planta não encontrada"}

    # upload nova imagem
    if imagem:

        extensao = imagem.filename.split(".")[-1]

        nome_arquivo = f"{uuid.uuid4()}.{extensao}"

        caminho_arquivo = f"uploads/plantas/{nome_arquivo}"

        resultado = cloudinary.uploader.upload(
            imagem.file,
            folder="horta"
        )

        planta.imagem_horta_url = resultado["secure_url"]

    planta.nome = nome
    planta.nome_cientifico = nome_cientifico
    planta.descricao = descricao
    planta.modo_de_uso = modo_de_uso
    planta.contraindicacoes = contraindicacoes
    planta.efeitos = efeitos

    db.commit()
    db.refresh(planta)

    return planta