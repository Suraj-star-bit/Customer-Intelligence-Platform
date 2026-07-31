import { useEffect, useState } from "react";

function AIInsights() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/recommendations")
      .then((res) => res.json())
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
      <div className="insights">
        <h2>🤖 AI Insights</h2>
        <p>Loading insights...</p>
      </div>
    );
  }

  

  return (
    <div className="insights">
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

      <h3>Segment Strategies</h3>

        <ul>
          {Object.entries(data.segment_recommendations).map(([segment, strategy]) => (
            <li key={segment}>
              <strong>{segment}:</strong> {strategy}
            </li>
          ))}
        </ul>
    </div>
  );
}

export default AIInsights;