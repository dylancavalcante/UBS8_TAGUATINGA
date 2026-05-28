from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.database.connection import engine
from app.database.base import Base

# rotas
from app.routes import publicacao_routes
from app.routes import horta_routes

# models
from app.models.admin_model import Admin
from app.models.publicacao_model import Publicacao
from app.models.horta_model import PublicacaoHorta


app = FastAPI()
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

app.add_middleware(
    CORSMiddleware,

    allow_origins=[
        "http://localhost:5173"
    ],

    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# cria tabelas
Base.metadata.create_all(bind=engine)

# registra rotas
app.include_router(publicacao_routes.router)
app.include_router(horta_routes.router)

@app.get("/")
def home():

    return {
        "mensagem": "API UBS funcionando"
    }