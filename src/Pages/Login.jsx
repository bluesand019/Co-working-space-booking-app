import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext";

export default function Login() {
  const { login, currentUser } = useBooking();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [role, setRole] = useState("member");

  if (currentUser) {
    return (
      <div className="card">
        <p>You're already logged in as {currentUser.name} ({currentUser.role}).</p>
      </div>
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return;
    login(name.trim(), role);
    navigate(role === "admin" ? "/admin" : "/");
  }

  return (
    <div className="card" style={{ maxWidth: 360 }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
        </div>
        <div className="form-group">
          <label>Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="member">Member</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit" className="btn">Login</button>
      </form>
    </div>
  );
}
