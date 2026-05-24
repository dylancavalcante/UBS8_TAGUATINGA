from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.deps import get_db

from app.controllers.publicacao_controller import (
    listar_publicacoes,
    criar_publicacao
)

from app.models.publicacao_model import Publicacao

from app.schemas.publicacao_schema import PublicacaoCreate

router = APIRouter(
    prefix="/publicacoes",
    tags=["Publicações"]
)

@router.get("/")
def get_publicacoes(
    db: Session = Depends(get_db)
):

    return listar_publicacoes(db)


@router.get("/{id}")
def buscar_publicacao(
    id: int,
    db: Session = Depends(get_db)
):

    return db.query(Publicacao).filter(
        Publicacao.publicacao_id == id
    ).first()


@router.post("/")
def create_publicacao(
    dados: PublicacaoCreate,
    db: Session = Depends(get_db)
):

    return criar_publicacao(db, dados)