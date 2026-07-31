from fastapi import APIRouter
from sqlalchemy import text
from app.database import engine
from sqlalchemy import func
from app.database import SessionLocal
from app.models import Customer

router = APIRouter()


@router.get("/analytics/customer-count")
def customer_count():

    with engine.connect() as connection:
        result = connection.execute(
            text("SELECT COUNT(*) FROM customers")
        )

        total = result.scalar()

    return {
        "total_customers": total
    }


@router.get("/analytics/gender")
def gender_distribution():

    with engine.connect() as connection:
        result = connection.execute(
            text("""
                SELECT "Gender", COUNT(*) AS total
                FROM customers
                GROUP BY "Gender"
            """)
        )

        data = []

        for row in result:
            data.append(dict(row._mapping))

    return data


@router.get("/analytics/average-age")
def average_age():

    with engine.connect() as connection:
        result = connection.execute(
            text("""
                SELECT ROUND(AVG("Age"), 2) AS average_age
                FROM customers
            """)
        )

        average = result.scalar()

    return {
        "average_age": average
    }


@router.get("/analytics/income")
def income_distribution():

    with engine.connect() as connection:
        result = connection.execute(
            text("""
                SELECT "Annual Income (k$)"
                FROM customers
            """)
        )

        income = [row[0] for row in result]

    return {
        "income": income
    }



@router.get("/analytics/max-spending-score")
def max_spending_score():

    with engine.connect() as connection:
        result = connection.execute(
            text("""
                SELECT MAX("Spending Score (1-100)") AS max_spending_score
                FROM customers
            """)
        )

        max_score = result.scalar()

    return {
        "max_spending_score": max_score
    }


@router.get("/analytics/top-customers")
def top_customers():

    with engine.connect() as connection:
        result = connection.execute(
            text("""
                SELECT *
                FROM customers
                ORDER BY "Spending Score (1-100)" DESC
                LIMIT 10
            """)
        )

        data = []

        for row in result:
            data.append(dict(row._mapping))

    return data


@router.get("/analytics/segments")
def customer_segments():

    with engine.connect() as connection:
        result = connection.execute(
            text("""
                SELECT 
                    "Customer_Segment",
                    COUNT(*) AS customers
                FROM customers
                GROUP BY "Customer_Segment"
                ORDER BY "Customer_Segment"
            """)
        )

        data = []

        for row in result:
            data.append(dict(row._mapping))

    return data

@router.get("/analytics/high-value")
def high_value_customers():

    with engine.connect() as connection:

        result = connection.execute(
            text("""
                SELECT *
                FROM customers
                WHERE 
                "Annual Income (k$)" > 70
                AND
                "Spending Score (1-100)" > 70
            """)
        )

        data=[]

        for row in result:
            data.append(dict(row._mapping))


    return data



@router.get("/analytics/debug-columns")
def debug_columns():
    with engine.connect() as connection:
        result = connection.execute(
            text("""
                SELECT column_name
                FROM information_schema.columns
                WHERE table_name = 'customers'
                ORDER BY ordinal_position;
            """)
        )

        return [row[0] for row in result]


@router.get("/recommendations")
def get_recommendations():
    db = SessionLocal()

    avg_age = db.query(func.avg(Customer.Age)).scalar()
    avg_income = db.query(func.avg(Customer.Annual_Income)).scalar()
    avg_spending = db.query(func.avg(Customer.Spending_Score)).scalar()

    male_count = db.query(Customer).filter(Customer.Gender == "Male").count()
    female_count = db.query(Customer).filter(Customer.Gender == "Female").count()

    recommendations = []

    if avg_spending >= 60:
        recommendations.append("Customers have high spending behaviour. Launch premium offers.")
    else:
        recommendations.append("Customer spending is moderate. Consider discounts and loyalty rewards.")

    if avg_age < 35:
        recommendations.append("The customer base is relatively young. Focus on digital marketing.")
    else:
        recommendations.append("The customer base is mature. Consider long-term loyalty programmes.")

    if avg_income >= 60:
        recommendations.append("Average income is high. Promote premium products.")
    else:
        recommendations.append("Introduce value-for-money bundles to increase conversions.")

    if female_count > male_count:
        recommendations.append("Female customers form the majority. Tailor campaigns accordingly.")
    else:
        recommendations.append("Male customers form the majority. Optimise campaigns for this audience.")

    # NEW: Segment-wise business strategies
    segment_recommendations = {
        "Premium Customers":
            "Offer exclusive memberships and premium products.",

        "Young Active Shoppers":
            "Promote trending products through digital campaigns.",

        "Conservative Customers":
            "Provide loyalty rewards and value-for-money bundles.",

        "High Income, Low Spending":
            "Use personalised offers to encourage higher spending."
    }

    db.close()

    return {
        "average_age": round(avg_age, 2),
        "average_income": round(avg_income, 2),
        "average_spending": round(avg_spending, 2),
        "recommendations": recommendations,
        "segment_recommendations": segment_recommendations
    }

@router.get("/highest-income")
def highest_income():
    db = SessionLocal()

    income = db.query(func.max(Customer.Annual_Income)).scalar()

    db.close()

    return {
        "highest_income": income
    }

@router.get("/highest-spending")
def highest_spending():
    db = SessionLocal()

    spending = db.query(func.max(Customer.Spending_Score)).scalar()

    db.close()

    return {
        "highest_spending": spending
    }

@router.get("/premium-customers")
def premium_customers():
    db = SessionLocal()

    premium = db.query(Customer).filter(
        Customer.Spending_Score >= 80
    ).count()

    db.close()

    return {
        "premium_customers": premium
    }

@router.get("/analytics/segment-summary")
def segment_summary():
    db = SessionLocal()

    segments = (
        db.query(
            Customer.Customer_Segment,
            func.count(Customer.CustomerID).label("total_customers"),
            func.avg(Customer.Annual_Income).label("avg_income"),
            func.avg(Customer.Spending_Score).label("avg_spending"),
            func.avg(Customer.Age).label("avg_age")
        )
        .group_by(Customer.Customer_Segment)
        .order_by(Customer.Customer_Segment)
        .all()
    )

    db.close()

    return [
        {
            "segment": s.Customer_Segment,
            "customers": s.total_customers,
            "average_income": round(s.avg_income, 2),
            "average_spending": round(s.avg_spending, 2),
            "average_age": round(s.avg_age, 2),
        }
        for s in segments
    ]