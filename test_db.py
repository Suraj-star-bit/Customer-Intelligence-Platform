from sqlalchemy import create_engine

engine = create_engine(
    "postgresql+psycopg2://postgres:Suraj@4s1g@localhost:9050/customer_intelligence"
)

print("Connected successfully!")