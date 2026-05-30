from jose import jwt, JWTError

from fastapi import Depends
from fastapi import HTTPException

from fastapi.security import HTTPBearer
from fastapi.security import HTTPAuthorizationCredentials

from app.core.auth import SECRET_KEY
from app.core.auth import ALGORITHM

security = HTTPBearer()

def verificar_token(

    credentials: HTTPAuthorizationCredentials = Depends(security)

):

    token = credentials.credentials

    try:

        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        return payload

    except JWTError:

        raise HTTPException(
            status_code=401,
            detail="Token inválido"
        )