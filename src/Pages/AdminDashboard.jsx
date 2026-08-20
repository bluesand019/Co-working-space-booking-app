import { useBooking } from "../context/BookingContext";

export default function AdminDashboard() {
  const { bookings, resources } = useBooking();

  function resourceName(resourceId) {
    return resources.find((r) => r.id === resourceId)?.name || "Unknown resource";
  }

  return (
    <div>
      <h2>Admin Dashboard — All Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings have been made yet.</p>
      ) : (
        <table border="1" cellPadding="6">
          <thead>
            <tr>
              <th>Resource</th>
              <th>Booked By</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id}>
                <td>{resourceName(b.resourceId)}</td>
                <td>{b.userName}</td>
                <td>{b.date}</td>
                <td>{b.startTime}–{b.endTime}</td>
                <td>{b.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}