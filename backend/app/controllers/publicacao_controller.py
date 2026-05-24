from sqlalchemy.orm import Session
from app.models.publicacao_model import Publicacao

def listar_publicacoes(db: Session):

    return db.query(Publicacao).all()

def criar_publicacao(db, dados):

    nova_publicacao = Publicacao(

        titulo=dados.titulo,
        resumo=dados.resumo,
        conteudo=dados.conteudo,
        categoria=dados.categoria,
        imagem_url=dados.imagem_url,
        admin_id=1
    )

    db.add(nova_publicacao)

    db.commit()

    db.refresh(nova_publicacao)

    return nova_publicacao