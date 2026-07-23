function StatsCards({ customers }) {
  const totalCustomers = customers.length;

  const averageAge =
    totalCustomers > 0
      ? (
          customers.reduce((sum, customer) => sum + customer.Age, 0) /
          totalCustomers
        ).toFixed(1)
      : 0;

  const averageIncome =
    totalCustomers > 0
      ? (
          customers.reduce(
            (sum, customer) => sum + customer["Annual Income (k$)"],
            0
          ) / totalCustomers
        ).toFixed(1)
      : 0;

  const averageSpending =
    totalCustomers > 0
      ? (
          customers.reduce(
            (sum, customer) => sum + customer["Spending Score (1-100)"],
            0
          ) / totalCustomers
        ).toFixed(1)
      : 0;

  return (
    <div className="cards">
      <div className="card">
        <h3>Total Customers</h3>
        <p>{totalCustomers}</p>
      </div>

      <div className="card">
        <h3>Average Age</h3>
        <p>{averageAge}</p>
      </div>

      <div className="card">
        <h3>Average Income</h3>
        <p>{averageIncome} k$</p>
      </div>

      <div className="card">
        <h3>Average Spending</h3>
        <p>{averageSpending}</p>
      </div>
    </div>
  );
}

export default StatsCards;