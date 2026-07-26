    import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
    } from "chart.js";

    import { Bar } from "react-chartjs-2";

    ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
    );

    function SpendingDistributionChart({ customers }) {
    const spendingGroups = {
    "0-20": 0,
    "21-40": 0,
    "41-60": 0,
    "61-80": 0,
    "81-100": 0,
    };

    customers.forEach((customer) => {
    const spending = customer["Spending Score (1-100)"];

    if (spending <= 20) spendingGroups["0-20"]++;
    else if (spending <= 40) spendingGroups["21-40"]++;
    else if (spending <= 60) spendingGroups["41-60"]++;
    else if (spending <= 80) spendingGroups["61-80"]++;
    else spendingGroups["81-100"]++;
    });

    const data = {
    labels: Object.keys(spendingGroups),
    datasets: [
        {
        label: "Customers",
        data: Object.values(spendingGroups),
        backgroundColor: "#2563eb",
        },
    ],
};

    return (
        <div className="chart-container">
        <h2>Spending Distribution</h2>

        <Bar data={data} />
        </div>
    );
}

export default SpendingDistributionChart;



