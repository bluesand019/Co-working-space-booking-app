import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BookingProvider } from "./context/BookingContext";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import BrowseSpaces from "./pages/BrowseSpaces";
import BookSpace from "./pages/BookSpace";
import MyBookings from "./pages/MyBookings";
import AdminDashboard from "./pages/AdminDashboard";
import ManageResources from "./pages/ManageResources";

// Cycle 2: real routing + navbar + role-protected pages.
// This file is the integration point for all 3 branches —
// merge here last, after auth, booking-flow, and admin-dashboard land.
function App() {
  return (
    <BookingProvider>
      <BrowserRouter>
        <h1>Co-working Space Booking (Prototype - Cycle 2)</h1>
        <Navbar />
        <hr />
        <Routes>
          <Route path="/" element={<BrowseSpaces />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/book"
            element={
              <ProtectedRoute requiredRole="member">
                <BookSpace />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-bookings"
            element={
              <ProtectedRoute requiredRole="member">
                <MyBookings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/resources"
            element={
              <ProtectedRoute requiredRole="admin">
                <ManageResources />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </BookingProvider>
  );
}

export default App;