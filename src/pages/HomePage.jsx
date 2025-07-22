
import { Link } from "react-router-dom";

function HomePage({ employees }) {
  return (
    <div className="container p-4 text-center">
      <h2 className="mb-4">Employee List</h2>
      <Link to="/register" className="btn btn-primary mb-3">Add New Employee</Link>
      <div className="table-responsive">
        <table className="table table-bordered table-hover text-center">
          <thead className="table-light">
            <tr>
              <th>Name</th><th>Email</th><th>Department</th><th>Salary</th><th>Manager</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.firstname} {emp.lastname}</td>
                <td>{emp.email}</td>
                <td>{emp.department}</td>
                <td>{emp.salary}</td>
                <td>{emp.manager}</td>
                <td>
                  <Link to={`/update/${emp.id}`} className="btn btn-sm btn-warning">Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HomePage;

