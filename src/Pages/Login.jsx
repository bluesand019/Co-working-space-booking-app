import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext";

export default function Login() {
  const { login, currentUser } = useBooking();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [role, setRole] = useState("member");

  if (currentUser) {
    return <p>You're already logged in as {currentUser.name} ({currentUser.role}).</p>;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return;
    login(name.trim(), role);
    navigate(role === "admin" ? "/admin" : "/");
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Role: </label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="member">Member</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
