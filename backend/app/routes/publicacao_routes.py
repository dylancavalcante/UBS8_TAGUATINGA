from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    UploadFile,
    File,
    Form
)

import cloudinary.uploader

from app.core.cloudinary_config import *

from sqlalchemy.orm import Session
from app.database.deps import get_db
from app.models.publicacao_model import Publicacao
from app.core.security import verificar_token
from app.schemas.publicacao_schema import PublicacaoResponse

import shutil
import os
import uuid

router = APIRouter(
    prefix="/publicacoes",
    tags=["Publicações"]
)

UPLOAD_DIR = "uploads/publicacoes"
os.makedirs(UPLOAD_DIR, exist_ok=True)


#  LISTAR
@router.get("/", response_model=list[PublicacaoResponse])
def get_publicacoes(db: Session = Depends(get_db)):

    return db.query(Publicacao).order_by(
        Publicacao.criado_em.desc()
    ).all()


#  BUSCAR POR ID
@router.get("/{id}", response_model=PublicacaoResponse)
def buscar_publicacao(id: int, db: Session = Depends(get_db)):

    publicacao = db.query(Publicacao).filter(
        Publicacao.publicacao_id == id
    ).first()

    if not publicacao:
        raise HTTPException(
            status_code=404,
            detail="Publicação não encontrada"
        )

    return publicacao


#  CRIAR PUBLICAÇÃO (UPLOAD REAL)
@router.post("/", response_model=PublicacaoResponse)
async def create_publicacao(

    titulo: str = Form(...),
    resumo: str = Form(...),
    conteudo: str = Form(...),
    categoria: str = Form(...),

    usuario = Depends(verificar_token),

    imagem: UploadFile = File(None),

    db: Session = Depends(get_db)
):

    imagem_url = None

    if imagem:
        nome_arquivo = f"{uuid.uuid4()}_{imagem.filename}"
        caminho_imagem = os.path.join(UPLOAD_DIR, nome_arquivo)

        with open(caminho_imagem, "wb") as buffer:
            shutil.copyfileobj(imagem.file, buffer)

        #  URL pública correta (Railway/Vercel friendly)
        imagem_url = f"/{caminho_imagem}".replace("\\", "/")

    nova_publicacao = Publicacao(
        titulo=titulo,
        resumo=resumo,
        conteudo=conteudo,
        categoria=categoria,
        imagem_url=imagem_url,
        admin_id=1
    )

    db.add(nova_publicacao)
    db.commit()
    db.refresh(nova_publicacao)

    return nova_publicacao


#  UPDATE
@router.put("/{id}", response_model=PublicacaoResponse)
async def atualizar_publicacao(

    id: int,
    titulo: str = Form(...),
    resumo: str = Form(...),
    conteudo: str = Form(...),
    categoria: str = Form(...),

    usuario = Depends(verificar_token),

    imagem: UploadFile = File(None),

    db: Session = Depends(get_db)
):

    publicacao = db.query(Publicacao).filter(
        Publicacao.publicacao_id == id
    ).first()

    if not publicacao:
        raise HTTPException(
            status_code=404,
            detail="Publicação não encontrada"
        )

    publicacao.titulo = titulo
    publicacao.resumo = resumo
    publicacao.conteudo = conteudo
    publicacao.categoria = categoria

    if imagem:

        resultado = cloudinary.uploader.upload(
            imagem.file,
            folder="publicacoes"
        )

        publicacao.imagem_url = resultado["secure_url"]

    db.commit()
    db.refresh(publicacao)

    return publicacao


#  DELETE
@router.delete("/{id}")
def deletar_publicacao(id: int, db: Session = Depends(get_db)):

    publicacao = db.query(Publicacao).filter(
        Publicacao.publicacao_id == id
    ).first()

    if not publicacao:
        raise HTTPException(
            status_code=404,
            detail="Publicação não encontrada"
        )


    db.delete(publicacao)
    db.commit()

    return {"mensagem": "Publicação deletada com sucesso"}