import os
from dotenv import load_dotenv

from langchain_huggingface import HuggingFaceEmbeddings
from langchain_qdrant import QdrantVectorStore

# Charger les variables d'environnement
from pathlib import Path
from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent
ENV_PATH = BASE_DIR / "backend" / ".env"

load_dotenv(dotenv_path=ENV_PATH)

print("Loaded env:", ENV_PATH)
print("QDRANT_URL =", os.getenv("QDRANT_URL"))
print("QDRANT_API_KEY =", "FOUND" if os.getenv("QDRANT_API_KEY") else "MISSING")
# Nom de la collection
COLLECTION_NAME = "knowledge_base"


class QdrantRetriever:
    def __init__(self):
        # Même modèle d'embeddings que pendant l'ingestion
        self.embeddings = HuggingFaceEmbeddings(
            model_name="BAAI/bge-small-en-v1.5"
        )

        # Connexion à Qdrant Cloud
        self.vector_store = QdrantVectorStore.from_existing_collection(
            embedding=self.embeddings,
            url=os.getenv("QDRANT_URL"),
            api_key=os.getenv("QDRANT_API_KEY"),
            collection_name=COLLECTION_NAME,
        )

        # Retriever
        self.retriever = self.vector_store.as_retriever(
            search_type="similarity",
            search_kwargs={
                "k": 5
            },
        )

    def retrieve(self, question: str):
        """
        Retourne les documents les plus pertinents.
        """
        return self.retriever.invoke(question)


# --------------------------------------------------------------------
# Test
# --------------------------------------------------------------------

if __name__ == "__main__":

    retriever = QdrantRetriever()

    question = "What is LangGraph?"

    docs = retriever.retrieve(question)

    print("=" * 80)
    print(f"Question : {question}")
    print("=" * 80)

    for i, doc in enumerate(docs, start=1):
        print(f"\nDocument {i}")
        print("-" * 80)
        print(doc.page_content[:1000])