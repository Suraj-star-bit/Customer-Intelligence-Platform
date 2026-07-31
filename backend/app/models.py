from sqlalchemy import Column, Integer, String
from app.database import Base

class Customer(Base):
    __tablename__ = "customers"

    CustomerID = Column(Integer, primary_key=True, index=True)
    Gender = Column(String)
    Age = Column(Integer)
    Annual_Income = Column("Annual Income (k$)", Integer)
    Spending_Score = Column("Spending Score (1-100)", Integer)
    Customer_Segment = Column("Customer_Segment", Integer)