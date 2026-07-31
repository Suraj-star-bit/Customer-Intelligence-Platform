from fastapi import APIRouter
from sqlalchemy import text
from app.database import engine
from fastapi import Query
from typing import Optional


router = APIRouter()




from typing import Optional
from fastapi import Query

@router.get("/customers")
def get_customers(
    limit: int = Query(50),
    offset: int = Query(0),
    gender: Optional[str] = None,
    min_age: Optional[int] = None,
):

    query = """
    SELECT *
    FROM customers
    WHERE 1=1
    """

    params = {}

    if gender:
        query += ' AND "Gender" = :gender'
        params["gender"] = gender

    if min_age is not None:
        query += ' AND "Age" >= :min_age'
        params["min_age"] = min_age

    query += """
    LIMIT :limit
    OFFSET :offset
    """

    params["limit"] = limit
    params["offset"] = offset

    with engine.connect() as connection:
        result = connection.execute(text(query), params)

        customers = [
            dict(row._mapping)
            for row in result
        ]

    return customers


@router.get("/analytics")
def analytics():

    with engine.connect() as connection:

        result = connection.execute(text("""

        SELECT
            COUNT(*) as total_customers,
            AVG("Average Income") as avg_income,
            AVG("Spending_Score") as avg_spending

        FROM customers

        """))

        analytics = dict(result.fetchone()._mapping)

        return analytics