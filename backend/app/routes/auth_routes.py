from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from fastapi.security import (
    OAuth2PasswordRequestForm
)

from sqlalchemy.orm import Session

from app.database.deps import get_db

from app.models.admin_model import Admin

from app.core.auth import (
    verificar_senha,
    criar_token
)

router = APIRouter(

    prefix="/auth",
    tags=["Auth"]

)

@router.post("/login")
def login(

    form_data: OAuth2PasswordRequestForm = Depends(),

    db: Session = Depends(get_db)

):

    admin = db.query(Admin).filter(

        Admin.usuario == form_data.username

    ).first()

    if not admin:

        raise HTTPException(

            status_code=401,
            detail="Usuário inválido"

        )

    senha_valida = verificar_senha(

        form_data.password,
        admin.senha

    )

    if not senha_valida:

        raise HTTPException(

            status_code=401,
            detail="Senha inválida"

        )

    token = criar_token({

        "sub": admin.usuario,
        "admin_id": admin.admin_id

    })

    return {

        "access_token": token,
        "token_type": "bearer"

    }