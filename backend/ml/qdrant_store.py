from .qdrant_client import client, COLLECTION
from qdrant_client.models import PointStruct, VectorParams, Distance
import hashlib

def deterministic_int_id(s: str):
    return int(hashlib.sha256(s.encode()).hexdigest()[:16], 16)

def store_embeddings_in_qdrant(embeddings, image_name: str, event_code: str):
    if not embeddings:
        return

    vec_len = len(embeddings[0])

    points = []
    for idx, vector in enumerate(embeddings):
        point_id = deterministic_int_id(f"{image_name}-{idx}")

        points.append(
            PointStruct(
                id=point_id,
                vector=vector,
                payload={
                    "image_name": image_name,
                    "event_code": event_code,
                    "face_index": idx
                }
            )
        )

    client.upsert(collection_name=COLLECTION, points=points)
    print(f"Stored {len(points)} ArcFace embeddings for {image_name}")
