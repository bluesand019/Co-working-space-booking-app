import { useBooking } from "../context/BookingContext";

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
        <div className="empty-state">
          <p>No bookings yet</p>
          <p>Head to Book a Space to reserve your first slot.</p>
        </div>
      ) : (
        <div>
          {myBookings.map((b) => (
            <div className="card" key={b.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <strong>{resourceName(b.resourceId)}</strong>
                <div style={{ color: "var(--ink-light)", fontSize: "0.88rem" }}>
                  {b.date} · {b.startTime}–{b.endTime}
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <span className={`pill pill-${b.status}`}>{b.status}</span>
                {b.status === "confirmed" && (
                  <button className="btn-danger" onClick={() => cancelBooking(b.id)}>Cancel</button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}