import { useState } from "react";
import { useNavigate } from "react-router-dom";

function UpdateEmployeeForm({ employee, employees, setEmployees }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ ...employee });
  const [newManager, setNewManager] = useState("");

  const managers = [...new Set(employees.filter(e => e.isManager).map(e => e.firstname + " " + e.lastname))].filter(mgr => mgr !== "Other");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let managerValue = formData.manager;
    if (formData.manager === "Other") {
      managerValue = newManager;
    }

    setEmployees(employees.map(emp =>
      emp.id === employee.id
        ? { ...formData, manager: managerValue }
        : emp
    ));
    navigate("/");
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Update Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">First Name:</label>
            <input type="text" name="firstname" className="form-control" value={formData.firstname} onChange={handleChange} />
          </div>

          <div className="col-md-6">
            <label className="form-label">Last Name:</label>
            <input type="text" name="lastname" className="form-control" value={formData.lastname} onChange={handleChange} />
          </div>

          <div className="col-md-6">
            <label className="form-label">Email:</label>
            <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} />
          </div>

          <div className="col-md-6">
            <label className="form-label">Department:</label>
            <input type="text" name="department" className="form-control" value={formData.department} onChange={handleChange} />
          </div>

          <div className="col-md-6">
            <label className="form-label">Salary:</label>
            <input type="number" name="salary" className="form-control" value={formData.salary} onChange={handleChange} />
          </div>

          <div className="col-md-6 d-flex align-items-center">
            <div className="form-check">
              <input type="checkbox" name="isManager" className="form-check-input" checked={formData.isManager} onChange={handleChange} id="isManagerCheck" />
              <label className="form-check-label" htmlFor="isManagerCheck">Is this employee a manager?</label>
            </div>
          </div>

          <div className="col-md-6">
            <label className="form-label">Select Manager:</label>
            <select name="manager" className="form-select" value={formData.manager} onChange={handleChange}>
              <option value="">-- Select Manager --</option>
              {managers.map((mgr, idx) => (
                <option key={idx} value={mgr}>{mgr}</option>
              ))}
              <option value="Other">Other</option>
            </select>
          </div>

          {formData.manager === "Other" && (
            <div className="col-md-6">
              <label className="form-label">Enter New Manager Name:</label>
              <input type="text" className="form-control" value={newManager} onChange={(e) => setNewManager(e.target.value)} />
            </div>
          )}

          <div className="col-12">
            <button type="submit" className="btn btn-primary">Update</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default UpdateEmployeeForm;
