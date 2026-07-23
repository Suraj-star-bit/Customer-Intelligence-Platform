import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function GenderChart({ customers }) {
  const maleCount = customers.filter(
    (customer) => customer.Gender === "Male"
  ).length;

  const femaleCount = customers.filter(
    (customer) => customer.Gender === "Female"
  ).length;

  const data = {
    labels: ["Male", "Female"],
    datasets: [
      {
        label: "Customers",
        data: [maleCount, femaleCount],
        backgroundColor: [
          "#36A2EB",
          "#FF6384",
        ],
      },
    ],
  };

  return (
    <div style={{ width: "400px", margin: "30px auto" }}>
      <h2>Gender Distribution</h2>
      <Pie data={data} />
    </div>
  );
}

export default GenderChart;