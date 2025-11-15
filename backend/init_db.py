from database.db import Base, engine
import database.models as models


print("Dropping all tables (if exist)...")
Base.metadata.drop_all(bind=engine)
print("Creating tables...")
Base.metadata.create_all(bind=engine)
print("Done.")