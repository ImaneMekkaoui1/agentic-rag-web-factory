import os
from dotenv import load_dotenv
from langsmith import traceable

# 1. Charger le fichier .env
load_dotenv()

# 2. Utiliser le décorateur @traceable pour enregistrer l'exécution des nœuds
@traceable(name="noeud_recherche_document")
def retrieve_docs(query: str):
    return {"documents": [f"Document trouvé pour : {query}"]}

@traceable(name="noeud_generation_llm")
def generate_answer(query: str, docs: list):
    return f"Réponse générée à partir de : {docs}"

@traceable(name="graphe_principal_rag")
def run_pipeline(user_query: str):
    docs = retrieve_docs(user_query)
    response = generate_answer(user_query, docs)
    return response

if __name__ == "__main__":
    print("Envoi d'une exécution de test à LangSmith...")
    resultat = run_pipeline("Comment fonctionne le RAG ?")
    print("Résultat local :", resultat)