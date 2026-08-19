import { createContext, useContext, useState } from "react";
import { initialResources } from "../Data/mockData";


const BookingContext = createContext(null);

export function BookingProvider({ children }) {
  const [resources] = useState(initialResources);
  const [bookings, setBookings] = useState([]);
  const [currentUser, setCurrentUser] = useState(null); // { name, role }

  function login(name, role) {
    setCurrentUser({ name, role });
  }

  function logout() {
    setCurrentUser(null);
  }

  function addBooking(resourceId, date, startTime, endTime) {
    if (!resourceId || !date || !startTime || !endTime) {
      return { success: false, message: "All fields are required." };
    }
    if (startTime >= endTime) {
      return { success: false, message: "Start time must be before end time." };
    }

    const conflict = bookings.some((b) => {
      if (b.resourceId !== resourceId || b.date !== date || b.status === "cancelled") {
        return false;
      }
      return startTime < b.endTime && endTime > b.startTime;
    });

    if (conflict) {
      return { success: false, message: "This resource is already booked for that time slot." };
    }

    const newBooking = {
      id: `b${Date.now()}`,
      resourceId,
      userName: currentUser?.name || "Unknown",
      date,
      startTime,
      endTime,
      status: "confirmed",
    };

    setBookings((prev) => [...prev, newBooking]);
    return { success: true };
  }

  function cancelBooking(bookingId) {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: "cancelled" } : b))
    );
  }

  const value = {
    resources,
    bookings,
    currentUser,
    login,
    logout,
    addBooking,
    cancelBooking,
  };

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within a BookingProvider");
  return ctx;
}
