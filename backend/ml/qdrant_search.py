
from .qdrant_client import client, COLLECTION


MIN_SCORE = 0.35  

def search_similar_faces(embeddings, event_code: str, top_k: int = 10):
    all_results = []

    for vector in embeddings:
        res = client.search(
            collection_name=COLLECTION,
            query_vector=vector,
            limit=top_k,
            query_filter={
                "must": [{"key": "event_code", "match": {"value": event_code}}]
            }
        )

        matches = []
        for hit in res:
            score = float(hit.score)
            if score < MIN_SCORE:  
                continue
            payload = hit.payload
            matches.append({
                "score": score,
                "image_name": payload.get("image_name"),
                "event_code": payload.get("event_code"),
                "face_index": payload.get("face_index")
            })

        all_results.append(matches)

    return all_results
