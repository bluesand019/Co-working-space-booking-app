import { useState } from "react";
import { useBooking } from "../context/BookingContext";

export default function BookSpace() {
  const { resources, bookings, addBooking, currentUser } = useBooking();
  const [resourceId, setResourceId] = useState(resources[0]?.id || "");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const existingForResource = bookings.filter(
    (b) => b.resourceId === resourceId && b.status === "confirmed"
  );

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    const result = addBooking(resourceId, date, startTime, endTime);
    if (result.success) {
      setSuccess("Booking confirmed!");
      setDate("");
      setStartTime("");
      setEndTime("");
    } else {
      setError(result.message);
    }
  }

  return (
    <div>
      <h2>Book a Space</h2>
      {!currentUser && <p style={{ color: "red" }}>Please login first.</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Resource: </label>
          <select value={resourceId} onChange={(e) => setResourceId(e.target.value)}>
            {resources.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Date: </label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div>
          <label>Start Time: </label>
          <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
        </div>
        <div>
          <label>End Time: </label>
          <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
        </div>
        <button type="submit" disabled={!currentUser}>Book</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <h3>Existing bookings for this resource</h3>
      {existingForResource.length === 0 ? (
        <p>No bookings yet for this resource.</p>
      ) : (
        <ul>
          {existingForResource.map((b) => (
            <li key={b.id}>
              {b.date}: {b.startTime}–{b.endTime}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}