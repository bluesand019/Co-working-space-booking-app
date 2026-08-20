import { useBooking } from "../context/BookingContext";

// Cycle 2: new page. Lists the logged-in user's bookings, lets them cancel.
export default function MyBookings() {
  const { bookings, resources, currentUser, cancelBooking } = useBooking();

  const myBookings = bookings.filter((b) => b.userName === currentUser?.name);

  function resourceName(resourceId) {
    return resources.find((r) => r.id === resourceId)?.name || "Unknown resource";
  }

  return (
    <div>
      <h2>My Bookings</h2>
      {myBookings.length === 0 ? (
        <p>You have no bookings yet.</p>
      ) : (
        <ul>
          {myBookings.map((b) => (
            <li key={b.id}>
              {resourceName(b.resourceId)} — {b.date} {b.startTime}–{b.endTime} —{" "}
              <strong>{b.status}</strong>
              {b.status === "confirmed" && (
                <button onClick={() => cancelBooking(b.id)}>Cancel</button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}