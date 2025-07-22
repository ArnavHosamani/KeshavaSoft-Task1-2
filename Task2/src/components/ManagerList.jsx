import { Link } from "react-router-dom";

function ManagerList({ employees }) {
  const managers = employees.filter(e => e.isManager);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Managers</h2>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {managers.map((manager) => (
          <div key={manager.id} className="col">
            <div className="card text-center p-3">
              <h4>{`${manager.firstname} ${manager.lastname}`}</h4>
              <Link to={`/manager/${manager.firstname} ${manager.lastname}`} className="btn btn-primary mt-3">
                View Employees
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManagerList;
