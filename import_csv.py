import pandas as pd
from sqlalchemy import create_engine

# PostgreSQL connection
engine = create_engine(
    "postgresql+psycopg2://postgres:Suraj%404s1g@localhost:9050/customer_intelligence"
)

# Read CSV
df = pd.read_csv("data/Mall_Customers.csv")

# Display first 5 rows
print(df.head())

# Import into PostgreSQL
df.to_sql(
    "customers",
    engine,
    if_exists="replace",  # Creates/Replaces the table
    index=False
)

print("Data imported successfully!")