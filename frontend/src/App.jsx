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



function App() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    api
      .get("/customers")
      .then((response) => {
        setCustomers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching customers:", error);
      });
  }, []);

  return (
    <>
      <Navbar />



<div className="container">

    <StatsCards customers={customers} />

    <GenderChart customers={customers} />

    <SegmentChart />

    <AgeDistributionChart customers={customers} />

    <IncomeDistributionChart customers={customers} />

    <SpendingDistributionChart customers={customers} />
    
    <CustomerTable customers={customers} />

    <AIInsights />

</div>
    </>
  );
}

export default App;