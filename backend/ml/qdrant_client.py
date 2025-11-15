from qdrant_client import QdrantClient
from qdrant_client.models import VectorParams, Distance, PayloadSchemaType
from dotenv import load_dotenv
import os

load_dotenv()

QDRANT_URL = os.getenv("QDRANT_URL")
QDRANT_API_KEY = os.getenv("QDRANT_API_KEY")

if not QDRANT_URL or not QDRANT_API_KEY:
    raise Exception("QDRANT_URL or QDRANT_API_KEY missing in .env")

client = QdrantClient(url=QDRANT_URL, api_key=QDRANT_API_KEY)

COLLECTION = "face_embeddings"

VECTOR_SIZE = 512

 
if not client.collection_exists(collection_name=COLLECTION):
    client.create_collection(
        collection_name=COLLECTION,
        vectors_config=VectorParams(
            size=VECTOR_SIZE,
            distance=Distance.COSINE
        )
    )
    print("Created collection with vector size 512 for ArcFace")

try:
    client.create_payload_index(
        collection_name=COLLECTION,
        field_name="event_code",
        field_schema=PayloadSchemaType.KEYWORD
    )
except:
    pass
