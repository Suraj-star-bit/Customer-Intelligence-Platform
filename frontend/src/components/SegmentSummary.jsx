import { useEffect, useState } from "react";
import api from "../services/api";

function SegmentSummary() {
  const [segments, setSegments] = useState([]);

  useEffect(() => {
    api.get("/analytics/segment-summary")
      .then((res) => setSegments(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>Customer Segment Summary</h2>
      <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Segment</th>
            <th>Customers</th>
            <th>Avg Income</th>
            <th>Avg Spending</th>
            <th>Avg Age</th>
          </tr>
        </thead>

        <tbody>
          {segments.map((segment) => (
            <tr key={segment.segment}>
              <td>{segment.segment}</td>
              <td>{segment.customers}</td>
              <td>{segment.average_income}</td>
              <td>{segment.average_spending}</td>
              <td>{segment.average_age}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default SegmentSummary;