import { useState } from "react";
import { useBooking } from "../context/BookingContext";


export default function BookSpace() {
  const { resources, addBooking, currentUser } = useBooking();
  const [resourceId, setResourceId] = useState(resources[0]?.id || "");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!currentUser) {
      alert("Please login first.");
      return;
    }

    const result = addBooking(resourceId, date, startTime, endTime);
    if (result.success) {
      alert("Booking confirmed!");
      setDate("");
      setStartTime("");
      setEndTime("");
    } else {
      alert(result.message);
    }
  }

  return (
    <div>
      <h2>Book a Space</h2>
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
        <button type="submit">Book</button>
      </form>
    </div>
  );
}