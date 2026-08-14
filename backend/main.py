from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import List, Optional

from backend.models.schemas import GenerateRequest, GenerateResponse
from backend.services.agent_service import generate_application


app = FastAPI(title="NLP IA Agent API")

# Configuration CORS pour autoriser le frontend Vite/React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ==========================================
# Modèles Pydantic (Schémas de données)
# ==========================================

# Auth
class SignUpRequest(BaseModel):
    fullName: str
    email: EmailStr
    password: str

class SignInRequest(BaseModel):
    email: EmailStr
    password: str

class AuthResponse(BaseModel):
    status: str
    token: str
    user: dict

# Projects & Workspace
class ProjectCreate(BaseModel):
    name: str
    description: str
    template: str

class Project(BaseModel):
    id: str
    name: str
    description: str
    template: str
    status: str = "active"

class WorkspaceState(BaseModel):
    project_id: str
    agents_status: dict
    logs: List[str]


# ==========================================
# Routes Générales
# ==========================================

@app.get("/")
def home():
    return {"message": "API fonctionne correctement"}


# ==========================================
# Routes d'Authentification (Sign Up / Sign In)
# ==========================================

@app.post("/api/auth/signup", response_model=AuthResponse, status_code=status.HTTP_201_CREATED)
def signup(credentials: SignUpRequest):
    # Logique de création d'utilisateur (Exemple)
    return {
        "status": "success",
        "token": "fake-jwt-token-xyz123",
        "user": {
            "fullName": credentials.fullName,
            "email": credentials.email
        }
    }

@app.post("/api/auth/signin", response_model=AuthResponse)
def signin(credentials: SignInRequest):
    # Logique de vérification d'utilisateur (Exemple)
    return {
        "status": "success",
        "token": "fake-jwt-token-xyz123",
        "user": {
            "fullName": "Utilisateur",
            "email": credentials.email
        }
    }


# ==========================================
# Routes des Projets & Workspace
# ==========================================

@app.post("/api/projects", status_code=status.HTTP_201_CREATED)
def create_project(project: ProjectCreate):
    print(f"Nouveau projet créé : {project.name} ({project.template})")
    return {
        "status": "success",
        "message": "Projet initialisé",
        "project": {
            "id": "proj-123",
            "name": project.name,
            "description": project.description,
            "template": project.template
        }
    }

@app.get("/api/workspace/{project_id}")
def get_workspace_details(project_id: str):
    # Envoie l'état du workspace pour le projet demandé
    return {
        "project_id": project_id,
        "status": "running",
        "agents": [
            {"name": "Planner", "status": "idle"},
            {"name": "Architect", "status": "active"},
            {"name": "Reviewer", "status": "idle"}
        ],
        "logs": [
            "Système initialisé",
            "Chargement de la configuration des agents..."
        ]
    }


# ==========================================
# Routes Génération IA / Agents
# ==========================================

@app.post("/generate", response_model=GenerateResponse)
def generate(request: GenerateRequest):
    result = generate_application(request.prompt)
    return {"result": result}