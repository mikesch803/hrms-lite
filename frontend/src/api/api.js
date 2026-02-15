const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:8000";

export const getEmployees = async () => {
  const res = await fetch(`${BASE_URL}/employees`);
  return res.json();
};

export const createEmployee = async (data) => {
  const res = await fetch(`${BASE_URL}/employees/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw await res.json();
  return res.json();
};

export const deleteEmployee = async (id) => {
  const res = await fetch(`${BASE_URL}/employees/${id}`, {
    method: "DELETE",
  });
  return res.json();
};

export const markAttendance = async (data) => {
  const res = await fetch(`${BASE_URL}/attendance/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw await res.json();
  return res.json();
};

export const getAttendance = async (id) => {
  const res = await fetch(`${BASE_URL}/attendance/${id}`);
  return res.json();
};