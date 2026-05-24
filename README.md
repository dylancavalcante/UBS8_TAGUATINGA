# UBS 8 de Taguatinga - Sistema Web 

Sistema web full stack desenvolvido para auxiliar na divulgação de projetos, publicações e iniciativas comunitárias de uma Unidade Básica de Saúde (UBS 8 de Taguatinga) do Distrito Federal.

O projeto possui uma área pública para visitantes e um painel administrativo para gerenciamento de conteúdo.

---

## Tecnologias Utilizadas

### Frontend
- React
- Vite
- TailwindCSS
- React Router DOM
- Axios
- Lucide React

### Backend
- FastAPI
- SQLAlchemy
- SQLite
- Uvicorn
- Pydantic

---

## Funcionalidades

### Área Pública
- Página inicial institucional
- Exibição de publicações
- Página de detalhes das publicações
- Projetos comunitários
- Horta medicinal
- Página de contato

### Painel Administrativo
- Login administrativo
- Dashboard
- Criação de publicações
- Gerenciamento de conteúdo
- Integração com API REST

---

## Estrutura do Projeto

```bash
ubs8_site/
│
├── backend/
│   ├── app/
│   │   ├── controllers/
│   │   ├── database/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── schemas/
│   │   └── main.py
│   │
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── routes/
│   │   └── services/
│   │
│   └── package.json
│
└── README.md 
```

## Como Executar o Projeto

### Backend

Abra o seu terminal e execute os comandos abaixo para iniciar a API:

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Backend rodando em: http://127.0.0.1:8000 | Documentação Swagger: http://127.0.0.1:8000/docs

### Frontend

Em outro terminal, execute os comandos abaixo para iniciar a interface:

```bash
cd frontend
npm install
npm run dev
```
Frontend rodando em: http://localhost:5173

## API REST

### Publicações

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| `GET` | `/publicacoes/` | Listar publicações |
| `POST` | `/publicacoes/` | Criar publicação |
| `DELETE` | `/publicacoes/{id}` | Deletar publicação |

---

## Objetivo do Projeto

Este projeto foi desenvolvido com foco em aprendizado prático de:

* Desenvolvimento Full Stack
* Integração Frontend + Backend
* APIs REST
* Organização em arquitetura por camadas
* Gerenciamento de banco de dados
* Interfaces modernas e responsivas