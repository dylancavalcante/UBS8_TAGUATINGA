from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.connection import engine
from app.database.base import Base

from app.routes import publicacao_routes
from app.models.admin_model import Admin
from app.models.publicacao_model import Publicacao

app = FastAPI()

app.add_middleware(
    CORSMiddleware,

    allow_origins=[
        "http://localhost:5173"
    ],

    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(publicacao_routes.router)

@app.get("/")
def home():

    return {
        "mensagem": "API UBS funcionando"
    }