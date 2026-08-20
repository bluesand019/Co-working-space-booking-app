import { useState } from "react";
import { useBooking } from "../context/BookingContext";

export default function Login() {
  const { login, currentUser, logout } = useBooking();
  const [name, setName] = useState("");
  const [role, setRole] = useState("member");

  if (currentUser) {
    return (
      <div>
        <p>Logged in as {currentUser.name} ({currentUser.role})</p>
        <button onClick={logout}>Logout</button>
      </div>
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return;
    login(name.trim(), role);
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