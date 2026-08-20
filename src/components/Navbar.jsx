import { Link, useNavigate, useLocation } from "react-router-dom";
import { useBooking } from "../context/BookingContext";
import "./Navbar.css";

export default function Navbar() {
  const { currentUser, logout } = useBooking();
  const navigate = useNavigate();
  const location = useLocation();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  function isActive(path) {
    return location.pathname === path ? "active" : "";
  }

  return (
    <nav className="navbar">
      <Link to="/" className={isActive("/")}>Browse Spaces</Link>
      {currentUser?.role === "member" && (
        <>
          <Link to="/book" className={isActive("/book")}>Book a Space</Link>
          <Link to="/my-bookings" className={isActive("/my-bookings")}>My Bookings</Link>
        </>
      )}
      {currentUser?.role === "admin" && (
        <>
          <Link to="/admin" className={isActive("/admin")}>Admin Dashboard</Link>
          <Link to="/admin/resources" className={isActive("/admin/resources")}>
            Manage Resources
          </Link>
        </>
      )}
      <div className="spacer" />
      {currentUser ? (
        <div className="user-info">
          <span>{currentUser.name} · {currentUser.role}</span>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <Link to="/login" className={isActive("/login")}>Login</Link>
      )}
    </nav>
  );
}
