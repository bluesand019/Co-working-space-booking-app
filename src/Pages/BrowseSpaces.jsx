import { useState } from "react";
import { useBooking } from "../context/BookingContext";
import ResourceCard from "../components/ResourceCard";

const filters = [
  { value: "all", label: "All" },
  { value: "hot_desk", label: "Hot Desk" },
  { value: "private_office", label: "Private Office" },
  { value: "meeting_room", label: "Meeting Room" },
];

export default function BrowseSpaces() {
  const { resources } = useBooking();
  const [activeFilter, setActiveFilter] = useState("all");

  const visible =
    activeFilter === "all" ? resources : resources.filter((r) => r.type === activeFilter);

  return (
    <div>
      <h2>Browse Spaces</h2>

      <div className="filter-bar">
        {filters.map((f) => (
          <button
            key={f.value}
            className={activeFilter === f.value ? "active" : ""}
            onClick={() => setActiveFilter(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <div className="empty-state">
          <p>No spaces match this filter</p>
          <p>Try a different space type.</p>
        </div>
      ) : (
        <div className="resource-grid">
          {visible.map((r) => (
            <ResourceCard key={r.id} resource={r} />
          ))}
        </div>
      )}
    </div>
  );
}
