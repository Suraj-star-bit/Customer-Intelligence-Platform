import { useEffect, useState } from "react";

function AIInsights() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://customer-intelligence-platform-api.onrender.com/recommendations")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed API request");
        }
        return res.json();
      })
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load AI insights.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div>
        🤖 AI Insights
        <p>Loading insights...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        🤖 AI Insights
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <h2>🤖 AI Business Insights</h2>

      <p>
        <strong>Average Age:</strong> {data.average_age}
      </p>

      <p>
        <strong>Average Income:</strong> {data.average_income}
      </p>

      <p>
        <strong>Average Spending:</strong> {data.average_spending}
      </p>

      <h3>Recommendations</h3>

      <ul>
        {data.recommendations.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default AIInsights;