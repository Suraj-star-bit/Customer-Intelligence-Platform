import "./DashboardHeader.css";

function DashboardHeader() {
  const today = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="dashboard-header">
      <div>
        <h1>Customer Intelligence Platform</h1>
        <p>
          Analyze customer behavior, identify high-value customers, and
          generate AI-powered business insights.
        </p>
      </div>

      <div className="date-box">
        {today}
      </div>
    </div>
  );
}

export default DashboardHeader;