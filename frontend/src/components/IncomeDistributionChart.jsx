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

    function IncomeDistributionChart({ customers }) {
    const incomeGroups = {
    "0-25k": 0,
    "26-50k": 0,
    "51-75k": 0,
    "76-100k": 0,
    "101k+": 0,
    };

    customers.forEach((customer) => {
    const income = customer["Annual Income (k$)"];

    if (income <= 25) incomeGroups["0-25k"]++;
    else if (income <= 50) incomeGroups["26-50k"]++;
    else if (income <= 75) incomeGroups["51-75k"]++;
    else if (income <= 100) incomeGroups["76-100k"]++;
    else incomeGroups["101k+"]++;
    });

    const data = {
    labels: Object.keys(incomeGroups),
    datasets: [
        {
        label: "Customers",
        data: Object.values(incomeGroups),
        backgroundColor: "#2563eb",
        },
    ],
    };

    return (
        <div className="chart-container">
        <h2>Income Distribution</h2>

        <Bar data={data} />
        </div>
    );
}

export default IncomeDistributionChart;

