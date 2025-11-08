from ml.qdrant_client import client

print("Connected successfully to Qdrant!")
print(client.get_collections())
