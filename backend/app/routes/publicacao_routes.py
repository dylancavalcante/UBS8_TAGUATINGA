from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    UploadFile,
    File,
    Form
)

from sqlalchemy.orm import Session

from app.database.deps import get_db

from app.models.publicacao_model import Publicacao

import shutil
import os

router = APIRouter(
    prefix="/publicacoes",
    tags=["Publicações"]
)

UPLOAD_DIR = "uploads/publicacoes"

os.makedirs(
    UPLOAD_DIR,
    exist_ok=True
)


@router.get("/")
def get_publicacoes(
    db: Session = Depends(get_db)
):

    return db.query(Publicacao).all()


@router.get("/{id}")
def buscar_publicacao(
    id: int,
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

    return publicacao


@router.post("/")
async def create_publicacao(

    titulo: str = Form(...),
    resumo: str = Form(...),
    conteudo: str = Form(...),
    categoria: str = Form(...),

    imagem: UploadFile = File(None),

    db: Session = Depends(get_db)

):

    imagem_url = None

    if imagem:

        caminho_imagem = (
            f"{UPLOAD_DIR}/{imagem.filename}"
        )

        with open(
            caminho_imagem,
            "wb"
        ) as buffer:

            shutil.copyfileobj(
                imagem.file,
                buffer
            )

        imagem_url = caminho_imagem

    nova_publicacao = Publicacao(

        titulo=titulo,
        resumo=resumo,
        conteudo=conteudo,
        categoria=categoria,
        imagem_url=imagem_url

    )

    db.add(nova_publicacao)

    db.commit()

    db.refresh(nova_publicacao)

    return nova_publicacao


@router.put("/{id}")
async def atualizar_publicacao(

    id: int,

    titulo: str = Form(...),
    resumo: str = Form(...),
    conteudo: str = Form(...),
    categoria: str = Form(...),

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

        if (
            publicacao.imagem_url
            and os.path.exists(
                publicacao.imagem_url
            )
        ):

            os.remove(
                publicacao.imagem_url
            )

        caminho_imagem = (
            f"{UPLOAD_DIR}/{imagem.filename}"
        )

        with open(
            caminho_imagem,
            "wb"
        ) as buffer:

            shutil.copyfileobj(
                imagem.file,
                buffer
            )

        publicacao.imagem_url = caminho_imagem

    db.commit()

    db.refresh(publicacao)

    return publicacao


@router.delete("/{id}")
def deletar_publicacao(

    id: int,

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

    if (
        publicacao.imagem_url
        and os.path.exists(
            publicacao.imagem_url
        )
    ):

        os.remove(
            publicacao.imagem_url
        )

    db.delete(publicacao)

    db.commit()

    return {
        "mensagem":
        "Publicação deletada com sucesso"
    }