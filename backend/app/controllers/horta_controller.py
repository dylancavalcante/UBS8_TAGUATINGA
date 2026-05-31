from sqlalchemy.orm import Session

from app.models.horta_model import PublicacaoHorta


def listar_plantas(db: Session):

    return db.query(PublicacaoHorta).all()


def criar_planta(db: Session, dados):

    nova_planta = PublicacaoHorta(

        nome=dados.nome,
        nome_cientifico=dados.nome_cientifico,
        descricao=dados.descricao,
        modo_de_uso=dados.modo_de_uso,
        contraindicacoes=dados.contraindicacoes,
        efeitos=dados.efeitos,
        imagem_horta_url=dados.imagem_horta_url,
        admin_id=1
    )

    db.add(nova_planta)

    db.commit()

    db.refresh(nova_planta)

    return nova_planta