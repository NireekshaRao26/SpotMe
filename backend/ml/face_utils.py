from deepface import DeepFace
import numpy as np
import traceback

def get_face_embeddings(image_path):
    """
    Extract face embeddings using ArcFace (512-d).
    Returns a list of embedding vectors (one per detected face).
    """
    try:
        reps = DeepFace.represent(
            img_path=image_path,
            model_name="ArcFace",
            detector_backend="retinaface",
            enforce_detection=False
        )

        
        if isinstance(reps, dict):
            reps = [reps]

        embeddings = []
        for r in reps:
            if isinstance(r, dict) and "embedding" in r:
                emb = r["embedding"]
                embeddings.append(list(map(float, emb)))

        return embeddings

    except Exception as e:
        print("ArcFace error:", str(e))
        traceback.print_exc()
        return []
