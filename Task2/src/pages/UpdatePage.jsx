import { useParams } from "react-router-dom";
import UpdateEmployeeForm from "../components/UpdateEmployeeForm";

function UpdatePage({ employees, setEmployees }) {
  const { id } = useParams();
  const employee = employees.find((emp) => emp.id === parseInt(id));

  return <UpdateEmployeeForm employee={employee} employees={employees} setEmployees={setEmployees} />;
}

export default UpdatePage;

