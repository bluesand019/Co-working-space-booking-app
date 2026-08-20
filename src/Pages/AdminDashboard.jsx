import { useBooking } from "../context/BookingContext";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const { bookings, resources } = useBooking();

  function resourceName(resourceId) {
    return resources.find((r) => r.id === resourceId)?.name || "Unknown resource";
  }

  return (
    <div>
      <h2>Admin Dashboard</h2>
      {bookings.length === 0 ? (
        <div className="empty-state">
          <p>No bookings yet</p>
          <p>Bookings will show up here once members start reserving spaces.</p>
        </div>
      ) : (
        <table className="admin-table">
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
                <td><span className={`pill pill-${b.status}`}>{b.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}