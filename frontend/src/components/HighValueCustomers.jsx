import { useEffect, useState } from "react";
import api from "../services/api";

function HighValueCustomers() {

    const [customers, setCustomers] = useState([]);

    useEffect(() => {

        api.get("/analytics/high-value")
            .then((res) => setCustomers(res.data))
            .catch((err) => console.log(err));

    }, []);

    return (
        <div>

            <h2>High Value Customers</h2>

            <div className="table-container">
            <table>

                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Gender</th>
                        <th>Age</th>
                        <th>Income</th>
                        <th>Spending Score</th>
                    </tr>
                </thead>

                <tbody>

                    {customers.map((customer) => (

                        <tr key={customer.CustomerID}>

                            <td>{customer.CustomerID}</td>
                            <td>{customer.Gender}</td>
                            <td>{customer.Age}</td>
                            <td>{customer["Annual Income (k$)"]}</td>
                            <td>{customer["Spending Score (1-100)"]}</td>

                        </tr>

                    ))}

                </tbody>

            </table>

            </div>
        </div>
    );

}

export default HighValueCustomers;