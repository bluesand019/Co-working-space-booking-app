import { createContext, useContext, useState, useEffect } from "react";
import { initialResources } from "../data/mockData";

const BookingContext = createContext(null);

function loadFromStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function BookingProvider({ children }) {
  const [resources, setResources] = useState(() =>
    loadFromStorage("cw_resources", initialResources)
  );
  const [bookings, setBookings] = useState(() => loadFromStorage("cw_bookings", []));
  const [currentUser, setCurrentUser] = useState(() =>
    loadFromStorage("cw_currentUser", null)
  );

  useEffect(() => {
    localStorage.setItem("cw_resources", JSON.stringify(resources));
  }, [resources]);

  useEffect(() => {
    localStorage.setItem("cw_bookings", JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem("cw_currentUser", JSON.stringify(currentUser));
  }, [currentUser]);

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


  function addResource(resource) {
    const newResource = { id: `r${Date.now()}`, ...resource };
    setResources((prev) => [...prev, newResource]);
  }

  function updateResource(id, changes) {
    setResources((prev) => prev.map((r) => (r.id === id ? { ...r, ...changes } : r)));
  }

  function deleteResource(id) {
    const hasActiveBookings = bookings.some(
      (b) => b.resourceId === id && b.status === "confirmed"
    );
    if (hasActiveBookings) {
      return {
        success: false,
        message: "Cannot delete: this resource has active bookings.",
      };
    }
    setResources((prev) => prev.filter((r) => r.id !== id));
    return { success: true };
  }

  const value = {
    resources,
    bookings,
    currentUser,
    login,
    logout,
    addBooking,
    cancelBooking,
    addResource,
    updateResource,
    deleteResource,
  };

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within a BookingProvider");
  return ctx;
}
