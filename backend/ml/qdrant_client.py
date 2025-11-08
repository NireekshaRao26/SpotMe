from qdrant_client import QdrantClient
from qdrant_client.models import VectorParams, Distance
from dotenv import load_dotenv
import os

load_dotenv()

QDRANT_URL = os.getenv("QDRANT_URL")
QDRANT_API_KEY = os.getenv("QDRANT_API_KEY")

client = QdrantClient(url=QDRANT_URL, api_key=QDRANT_API_KEY)


collection_name = "face_embeddings"


if not client.collection_exists(collection_name=collection_name):
    client.create_collection(
        collection_name=collection_name,
        vectors_config=VectorParams(size=128, distance=Distance.COSINE)
    )
    print(f"Created collection '{collection_name}' (128-d COSINE)")
else:
    print(f"ℹCollection '{collection_name}' already exists")
from qdrant_client.models import PayloadSchemaType


client.create_payload_index(
    collection_name=collection_name,
    field_name="event_name",
    field_schema=PayloadSchemaType.KEYWORD
)

print("Created payload index for event_name")
