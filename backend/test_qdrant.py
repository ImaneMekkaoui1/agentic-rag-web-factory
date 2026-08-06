import os
from dotenv import load_dotenv
from qdrant_client import QdrantClient

load_dotenv()

qdrant_url = os.getenv("QDRANT_URL")
qdrant_api_key = os.getenv("QDRANT_API_KEY")

try:
    client = QdrantClient(
        url=qdrant_url, 
        api_key=qdrant_api_key
    )
    # Lister les collections existantes dans le cluster
    collections = client.get_collections()
    print("Connexion à Qdrant Cloud réussie !")
    print("Collections existantes :", collections)
except Exception as e:
    print(f"Erreur de connexion à Qdrant : {e}")