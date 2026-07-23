function CustomerTable({ customers }) {
  if (customers.length === 0) return <p>No customers found.</p>;

  return (
    <table>
      <thead>
        <tr>
          {Object.keys(customers[0]).map((key) => (
            <th key={key}>{key}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {customers.map((customer, index) => (
          <tr key={index}>
            {Object.values(customer).map((value, i) => (
              <td key={i}>{String(value)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CustomerTable;