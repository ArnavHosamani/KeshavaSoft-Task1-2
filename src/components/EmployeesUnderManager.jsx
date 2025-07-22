import { useParams, Link } from "react-router-dom";

function EmployeesUnderManager({ employees }) {
  const { managerName } = useParams();

  const filteredEmployees = employees.filter(emp => emp.manager === managerName);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Employees under {managerName}</h2>
      {filteredEmployees.length === 0 ? (
        <p className="text-center">No employees are reporting to {managerName}.</p>
      ) : (
        <ul className="list-group">
          {filteredEmployees.map(emp => (
            <li key={emp.id} className="list-group-item">
              {emp.firstname} {emp.lastname} - {emp.department}
            </li>
          ))}
        </ul>
      )}
      <div className="text-center mt-3">
        <Link to="/" className="btn btn-secondary">Back to Employees</Link>
      </div>
    </div>
  );
}

export default EmployeesUnderManager;
