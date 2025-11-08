from .qdrant_client import client, collection_name
from qdrant_client.models import Filter, FieldCondition, MatchValue

def search_similar_faces(query_embeddings, event_name, top_k=5):
    results = []
    event_filter = Filter(
        must=[FieldCondition(key="event_name", match=MatchValue(value=event_name))]
    )

    for emb in query_embeddings:
        search_result = client.search(
            collection_name=collection_name,
            query_vector=emb,
            limit=top_k,
            query_filter=event_filter
        )
        matches = [
            {
                "score": r.score,
                "image_name": r.payload.get("image_name"),
                "event_name": r.payload.get("event_name"),
                "face_index": r.payload.get("face_index")
            }
            for r in search_result
        ]
        results.append(matches)
    return results
