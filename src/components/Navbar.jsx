import { Link, useNavigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext";

export default function Navbar() {
  const { currentUser, logout } = useBooking();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <nav>
      <Link to="/">Browse Spaces</Link>
      {currentUser?.role === "member" && (
        <>
          {" | "}
          <Link to="/book">Book a Space</Link>
          {" | "}
          <Link to="/my-bookings">My Bookings</Link>
        </>
      )}
      {currentUser?.role === "admin" && (
        <>
          {" | "}
          <Link to="/admin">Admin Dashboard</Link>
          {" | "}
          <Link to="/admin/resources">Manage Resources</Link>
        </>
      )}
      {" | "}
      {currentUser ? (
        <span>
          {currentUser.name} ({currentUser.role}){" "}
          <button onClick={handleLogout}>Logout</button>
        </span>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
}
