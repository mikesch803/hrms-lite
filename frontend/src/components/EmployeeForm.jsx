import { useState } from "react";
import { createEmployee } from "../api/api";
import "../styles/form.css";

function EmployeeForm({ onSuccess }) {
  const [form, setForm] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createEmployee(form);
      setForm({
        employee_id: "",
        full_name: "",
        email: "",
        department: "",
      });
      onSuccess();
    } catch (err) {
      alert(err.detail || "Error creating employee");
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input placeholder="Employee ID" required
        value={form.employee_id}
        onChange={(e) => setForm({ ...form, employee_id: e.target.value })}
      />
      <input placeholder="Full Name" required
        value={form.full_name}
        onChange={(e) => setForm({ ...form, full_name: e.target.value })}
      />
      <input type="email" placeholder="Email" required
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input placeholder="Department" required
        value={form.department}
        onChange={(e) => setForm({ ...form, department: e.target.value })}
      />
      <button type="submit">Add Employee</button>
    </form>
  );
}

export default EmployeeForm;