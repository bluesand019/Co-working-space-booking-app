import { useState } from "react";
import { useBooking } from "../context/BookingContext";


export default function ManageResources() {
  const { resources, addResource, deleteResource } = useBooking();
  const [name, setName] = useState("");
  const [type, setType] = useState("hot_desk");
  const [capacity, setCapacity] = useState(1);
  const [error, setError] = useState("");

  function handleAdd(e) {
    e.preventDefault();
    if (!name.trim()) return;
    addResource({ name: name.trim(), type, capacity: Number(capacity) });
    setName("");
    setCapacity(1);
  }

  function handleDelete(id) {
    const result = deleteResource(id);
    if (!result.success) {
      setError(result.message);
    } else {
      setError("");
    }
  }

  return (
    <div>
      <h2>Manage Resources</h2>

      <form onSubmit={handleAdd}>
        <div>
          <label>Name: </label>
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Type: </label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="hot_desk">Hot Desk</option>
            <option value="private_office">Private Office</option>
            <option value="meeting_room">Meeting Room</option>
          </select>
        </div>
        <div>
          <label>Capacity: </label>
          <input
            type="number"
            min="1"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
          />
        </div>
        <button type="submit">Add Resource</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <h3>Existing Resources</h3>
      <ul>
        {resources.map((r) => (
          <li key={r.id}>
            {r.name} — {r.type} — capacity {r.capacity}{" "}
            <button onClick={() => handleDelete(r.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
