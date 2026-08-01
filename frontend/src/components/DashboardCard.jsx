function DashboardCard({ title, children }) {
  return (
    <div className="dashboard-card">
      <div className="dashboard-card-header">
        <h3>{title}</h3>
      </div>

      <div className="dashboard-card-body">
        {children}
      </div>
    </div>
  );
}

export default DashboardCard;