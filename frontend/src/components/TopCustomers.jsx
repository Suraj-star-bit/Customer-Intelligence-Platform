import { useEffect, useState } from "react";
import api from "../services/api";

function TopCustomers() {
  const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get("/analytics/top-customers")
            .then((res) => {
                setCustomers(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, []);


    if (loading) {
    return <h3>Loading Top Customers...</h3>;
}

  return (
    <div className="table-container">
      <h2>Top 10 Customers</h2>

      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>ID</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Income</th>
            <th>Spending Score</th>
            <th>Segment</th>
          </tr>
        </thead>

        <tbody>
          {customers.map((customer, index) => (
            <tr key={customer.CustomerID}>
              <td>{index + 1}</td>
              <td>{customer.CustomerID}</td>
              <td>{customer.Gender}</td>
              <td>{customer.Age}</td>
              <td>{customer["Annual Income (k$)"]}k$</td>
              <td>{customer["Spending Score (1-100)"]}</td>
              <td>{customer.Customer_Segment}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TopCustomers;