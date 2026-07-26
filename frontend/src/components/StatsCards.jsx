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

      const highestIncome =
  totalCustomers > 0
    ? Math.max(...customers.map(customer => customer["Annual Income (k$)"]))
    : 0;

const highestSpending =
  totalCustomers > 0
    ? Math.max(...customers.map(customer => customer["Spending Score (1-100)"]))
    : 0;

const premiumCustomers =
  customers.filter(
    customer => customer["Spending Score (1-100)"] >= 80
  ).length;

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

      <div className="card">
        <h3>Highest Income</h3>
        <p>{highestIncome} k$</p>
      </div>

      <div className="card">
        <h3>Highest Spending</h3>
        <p>{highestSpending}</p>
      </div>

      <div className="card">
        <h3>Premium Customers</h3>
        <p>{premiumCustomers}</p>
      </div>
    </div>
  );
}

export default StatsCards;