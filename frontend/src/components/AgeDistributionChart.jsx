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

    function AgeDistributionChart({ customers }) {
    const ageGroups = {
        "18-25": 0,
        "26-35": 0,
        "36-45": 0,
        "46-55": 0,
        "56+": 0,
    };

    customers.forEach((customer) => {
        const age = customer.Age;

        if (age <= 25) ageGroups["18-25"]++;
        else if (age <= 35) ageGroups["26-35"]++;
        else if (age <= 45) ageGroups["36-45"]++;
        else if (age <= 55) ageGroups["46-55"]++;
        else ageGroups["56+"]++;
    });

    const data = {
        labels: Object.keys(ageGroups),
        datasets: [
        {
            label: "Customers",
            data: Object.values(ageGroups),
            backgroundColor: "#2563eb",
        },
        ],
    };

    return (
        <div className="chart-container">
        <h2>Age Distribution</h2>

        <Bar data={data} />
        </div>
    );
}

export default AgeDistributionChart;