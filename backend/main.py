from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from data_pdf.backend.models.schemas import GenerateRequest, GenerateResponse
from data_pdf.backend.services.agent_service import generate_application


app = FastAPI(
    title="NLP IA Agent API"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "API fonctionne"
    }


@app.post(
    "/generate",
    response_model=GenerateResponse
)
def generate(request: GenerateRequest):

    result = generate_application(
        request.prompt
    )

    return {
        "result": result
    }