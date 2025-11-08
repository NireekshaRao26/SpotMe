from deepface import DeepFace
import numpy as np
import cv2

def get_face_embeddings(image_path):
    try:
        detections = DeepFace.represent(img_path=image_path, model_name="Facenet", enforce_detection=False)
        embeddings = [np.array(det["embedding"]).tolist() for det in detections]
        return embeddings
    except Exception as e:
        print("Error generating embeddings:", e)
        return []
