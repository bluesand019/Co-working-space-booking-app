import { useState } from "react";
import { useBooking } from "../context/BookingContext";

export default function ManageResources() {
  const { resources, addResource, updateResource, deleteResource } = useBooking();
  const [name, setName] = useState("");
  const [type, setType] = useState("hot_desk");
  const [capacity, setCapacity] = useState(1);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editCapacity, setEditCapacity] = useState(1);

  function handleAdd(e) {
    e.preventDefault();
    if (!name.trim()) return;
    addResource({ name: name.trim(), type, capacity: Number(capacity) });
    setName("");
    setCapacity(1);
  }

  function handleDelete(id) {
    const result = deleteResource(id);
    setError(result.success ? "" : result.message);
  }

  function startEdit(resource) {
    setEditingId(resource.id);
    setEditName(resource.name);
    setEditCapacity(resource.capacity);
  }

  function saveEdit(id) {
    if (!editName.trim()) return;
    updateResource(id, { name: editName.trim(), capacity: Number(editCapacity) });
    setEditingId(null);
  }

  return (
    <div>
      <h2>Manage Resources</h2>

      <div className="card" style={{ maxWidth: 420 }}>
        <form onSubmit={handleAdd}>
          <div className="form-group">
            <label>Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Hot Desk 6" />
          </div>
          <div className="form-group">
            <label>Type</label>
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="hot_desk">Hot Desk</option>
              <option value="private_office">Private Office</option>
              <option value="meeting_room">Meeting Room</option>
            </select>
          </div>
          <div className="form-group">
            <label>Capacity</label>
            <input type="number" min="1" value={capacity} onChange={(e) => setCapacity(e.target.value)} />
          </div>
          <button type="submit" className="btn">Add Resource</button>
        </form>
        {error && <div className="alert alert-error">{error}</div>}
      </div>

      <h3>Existing Resources</h3>
      {resources.length === 0 ? (
        <div className="empty-state">
          <p>No resources yet</p>
          <p>Add your first desk or room above.</p>
        </div>
      ) : (
        resources.map((r) =>
          editingId === r.id ? (
            <div className="card" key={r.id}>
              <div className="form-group">
                <label>Name</label>
                <input value={editName} onChange={(e) => setEditName(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Capacity</label>
                <input
                  type="number"
                  min="1"
                  value={editCapacity}
                  onChange={(e) => setEditCapacity(e.target.value)}
                />
              </div>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button className="btn" onClick={() => saveEdit(r.id)}>Save</button>
                <button className="btn-danger" onClick={() => setEditingId(null)}>Cancel</button>
              </div>
            </div>
          ) : (
            <div
              className="card"
              key={r.id}
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
            >
              <div>
                <strong>{r.name}</strong>
                <div style={{ color: "var(--ink-light)", fontSize: "0.85rem" }}>
                  {r.type.replace("_", " ")} · capacity {r.capacity}
                </div>
              </div>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button className="btn-danger" onClick={() => startEdit(r)} style={{ color: "var(--primary)", borderColor: "var(--primary-light)" }}>
                  Edit
                </button>
                <button className="btn-danger" onClick={() => handleDelete(r.id)}>Delete</button>
              </div>
            </div>
          )
        )
      )}
    </div>
  );
}
