from datetime import datetime, timedelta

from jose import jwt
from passlib.context import CryptContext

from dotenv import load_dotenv
import os

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY_JWT")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)

def verificar_senha(
    senha,
    senha_hash
):

    return pwd_context.verify(
        senha,
        senha_hash
    )

def criar_token(
    data: dict
):

    dados = data.copy()

    expire = datetime.utcnow() + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    dados.update({
        "exp": expire
    })

    token = jwt.encode(
        dados,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return token