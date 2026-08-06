import os
from dotenv import load_dotenv
from langchain_community.document_loaders import PyPDFDirectoryLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_qdrant import QdrantVectorStore

# 1. Charger les variables d'environnement (.env)
load_dotenv()

def run_pdf_ingestion():
    pdf_folder_path = "./data_pdf"
    
    # Vérification de la présence du dossier
    if not os.path.exists(pdf_folder_path):
        os.makedirs(pdf_folder_path)
        print(f"Le dossier '{pdf_folder_path}' a été créé. Place tes fichiers PDF dedans puis relance le script.")
        return

    # 2. Charger tous les fichiers PDF du dossier
    print(f"Chargement des fichiers PDF depuis '{pdf_folder_path}'...")
    loader = PyPDFDirectoryLoader(pdf_folder_path)
    documents = loader.load()

    if not documents:
        print(f"❌ Aucun fichier PDF trouvé dans '{pdf_folder_path}'. Veuillez en ajouter.")
        return

    print(f"Nombre de pages chargées : {len(documents)}")

    # 3. Découper le texte des PDF en segments (chunks)
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=800,
        chunk_overlap=100
    )
    docs_split = text_splitter.split_documents(documents)
    print(f"Nombre total de segments (chunks) générés : {len(docs_split)}")

    # 4. Modèle d'embeddings 100% gratuit et local
    print("Initialisation du modèle d'embeddings local HuggingFace...")
    embeddings = HuggingFaceEmbeddings(model_name="BAAI/bge-small-en-v1.5")

    # 5. Envoi et indexation dans Qdrant Cloud
    print("Envoi des vecteurs à Qdrant Cloud...")
    QdrantVectorStore.from_documents(
        docs_split,
        embeddings,
        url=os.getenv("QDRANT_URL"),
        api_key=os.getenv("QDRANT_API_KEY"),
        collection_name="knowledge_base",
        force_recreate=True
    )
    print("✅ Ingestion des PDF réussie dans la collection 'knowledge_base' !")

if __name__ == "__main__":
    run_pdf_ingestion()