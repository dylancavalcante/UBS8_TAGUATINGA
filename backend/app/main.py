from fastapi import FastAPI

from app.database.connection import engine
from app.database.base import Base

from app.routes import publicacao_routes, horta_routes, auth_routes

from app.models.admin_model import Admin
from app.models.publicacao_model import Publicacao
from app.models.horta_model import PublicacaoHorta


from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
        "https://ubs-8-taguatinga.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# cria tabelas
Base.metadata.create_all(bind=engine)

# rotas
app.include_router(publicacao_routes.router)
app.include_router(horta_routes.router)
app.include_router(auth_routes.router)


@app.get("/")
def home():
    return {"mensagem": "API UBS funcionando"}