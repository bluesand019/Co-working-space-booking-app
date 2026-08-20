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
import "./App.css";

function App() {
  return (
    <BookingProvider>
      <BrowserRouter>
        <header className="app-header">
          <h1>Co-working Space Booking</h1>
          <div className="subtitle">Reserve desks, offices, and meeting rooms</div>
        </header>
        <Navbar />
        <main className="main-content">
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
        </main>
      </BrowserRouter>
    </BookingProvider>
  );
}

export default App;
