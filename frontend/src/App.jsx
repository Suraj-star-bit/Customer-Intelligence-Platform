import { useEffect, useState } from "react";
import api from "./services/api";
import Navbar from "./components/Navbar";
import StatsCards from "./components/StatsCards";
import CustomerTable from "./components/CustomerTable";
import AIInsights from "./components/AIInsights";
import GenderChart from "./components/GenderChart";
import SegmentChart from "./components/SegmentChart";
import AgeDistributionChart from "./components/AgeDistributionChart"
import IncomeDistributionChart from "./components/IncomeDistributionChart";
import SpendingDistributionChart from "./components/SpendingDistributionChart";
import DashboardCard from "./components/DashboardCard";
import "./App.css";
import DashboardHeader from "./components/DashboardHeader";
import SegmentSummary from "./components/SegmentSummary";
import HighValueCustomers from "./components/HighValueCustomers";
import TopCustomers from "./components/TopCustomers";


function App() {
  const [customers, setCustomers] = useState([]);
  const [gender, setGender] = useState("");
  const [minAge, setMinAge] = useState("");
  const [searchId, setSearchId] = useState("");
  const [segment, setSegment] = useState("");

  useEffect(() => {
      const params = new URLSearchParams();

      if (gender) {
        params.append("gender", gender);
      }

      if (minAge !== "") {
        params.append("min_age", minAge);
      }

      const query = params.toString();
      const url = query ? `/customers?${query}` : "/customers";

      api.get(url)
        .then((response) => {
          setCustomers(response.data);
        })
        .catch((error) => {
          console.error("Error fetching customers:", error);
        });

    }, [gender, minAge]);

    const filteredCustomers = customers.filter((customer) => {

  const idMatch =
    searchId === "" ||
    customer.CustomerID.toString().includes(searchId);

  const segmentMatch =
    segment === "" ||
    customer.Customer_Segment?.toString() === segment;

  return idMatch && segmentMatch;
});



 return (
<>
    <Navbar />

    <div className="dashboard">

    <DashboardHeader />

    <StatsCards customers={customers} />

        <div className="chart-grid">

          <DashboardCard title="Gender Distribution">
            <GenderChart customers={customers} />
          </DashboardCard>

          <DashboardCard title="Customer Segments">
            <SegmentChart />
          </DashboardCard>

          <DashboardCard title="Age Distribution">
            <AgeDistributionChart customers={customers} />
          </DashboardCard>

          <DashboardCard title="Income Distribution">
            <IncomeDistributionChart customers={customers} />
          </DashboardCard>

          <DashboardCard title="Spending Distribution">
            <SpendingDistributionChart customers={customers} />
          </DashboardCard>

          <DashboardCard title="AI Insights">
            <AIInsights />
          </DashboardCard>

        </div>
        <DashboardCard title="Customer Segment Summary">
          <SegmentSummary />
      </DashboardCard>

      <DashboardCard title="High Value Customers">
          <HighValueCustomers />
      </DashboardCard>

      <DashboardCard title="Top 10 Customers">
          <TopCustomers />
      </DashboardCard>

        <div className="filter-section">

          <input
            type="text"
            placeholder="🔍 Search Customer ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />

          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">All Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <select
            value={segment}
            onChange={(e) => setSegment(e.target.value)}
          >
            <option value="">All Segments</option>
              <option value="0">Conservative Customers</option>
              <option value="1">Premium Customers</option>
              <option value="2">Young Active Shoppers</option>
              <option value="3">High Income, Low Spending</option>
          </select>

          <input
            type="number"
            placeholder="Minimum Age"
            value={minAge}
            onChange={(e) => setMinAge(e.target.value)}
          />

          <button
            onClick={() => {
              setSearchId("");
              setGender("");
              setSegment("");
              setMinAge("");
            }}
          >
            Reset
          </button>

        </div>

        <CustomerTable customers={filteredCustomers} />

    </div>
</>
);
}

export default App;