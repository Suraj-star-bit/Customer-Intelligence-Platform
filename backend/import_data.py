import pandas as pd
from sqlalchemy import create_engine
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL)

# Read CSV
df = pd.read_csv("../data/Mall_Customers.csv")

# Rename columns to match your SQLAlchemy model
df.rename(columns={
    "Annual Income (k$)": "Annual Income (k$)",
    "Spending Score (1-100)": "Spending Score (1-100)"
}, inplace=True)

# Insert into Neon
df.to_sql(
    "customers",
    engine,
    if_exists="replace",
    index=False
)

print("✅ Data imported successfully!")