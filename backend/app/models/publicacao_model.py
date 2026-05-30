from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    DateTime
)

from sqlalchemy.sql import func

from app.database.base import Base
from sqlalchemy import ForeignKey


class Publicacao(Base):

    __tablename__ = "publicacoes"

    publicacao_id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    titulo = Column(
        String,
        nullable=False
    )

    resumo = Column(
        String,
        nullable=False
    )

    conteudo = Column(
        Text,
        nullable=False
    )

    categoria = Column(
        String,
        nullable=False
    )

    imagem_url = Column(
        String,
        nullable=True
    )

    criado_em = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )
    admin_id = Column(
    Integer,
    ForeignKey("admins.admin_id"),
    nullable=False
)