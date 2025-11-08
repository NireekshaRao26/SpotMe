from .qdrant_client import client, collection_name
import uuid

def store_embeddings_in_qdrant(embeddings, image_name, event_name):
    points = []
    for i, embedding in enumerate(embeddings):
        points.append({
            "id": str(uuid.uuid4()),
            "vector": embedding,
            "payload": {
                "image_name": image_name,
                "face_index": i,
                "event_name": event_name
            }
        })
    client.upsert(collection_name=collection_name, points=points)
    print(f"Stored {len(embeddings)} embeddings in Qdrant for event {event_name}")
