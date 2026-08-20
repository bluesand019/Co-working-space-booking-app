import { Navigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext";

// simple role-based route guard. No real auth/tokens —
// just checks currentUser in Context (backed by localStorage).
export default function ProtectedRoute({ children, requiredRole }) {
  const { currentUser } = useBooking();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && currentUser.role !== requiredRole) {
    return <p>You don't have access to this page.</p>;
  }

  return children;
}
