import EmployeeForm from "../components/EmployeeForm";

function RegisterPage({ employees, setEmployees }) {
  return <EmployeeForm employees={employees} setEmployees={setEmployees} />;
}

export default RegisterPage;
