from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.deps import get_db

from app.controllers.horta_controller import (
    listar_plantas,
    criar_planta
)

from app.models.horta_model import PublicacaoHorta

from app.schemas.horta_schema import HortaCreate

router = APIRouter(
    prefix="/horta",
    tags=["Horta"]
)

@router.get("/")
def get_plantas(
    db: Session = Depends(get_db)
):

    return listar_plantas(db)


@router.get("/{id}")
def buscar_planta(
    id: int,
    db: Session = Depends(get_db)
):

    return db.query(PublicacaoHorta).filter(
        PublicacaoHorta.horta_id == id
    ).first()


@router.post("/")
def create_planta(
    dados: HortaCreate,
    db: Session = Depends(get_db)
):

    return criar_planta(db, dados)