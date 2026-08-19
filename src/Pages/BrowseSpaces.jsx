import { useBooking } from "../context/BookingContext";

export default function BrowseSpaces() {
  const { resources } = useBooking();

  return (
    <div>
      <h2>Browse Spaces</h2>
      <ul>
        {resources.map((r) => (
          <li key={r.id}>
            {r.name} — {r.type} — capacity {r.capacity}
          </li>
        ))}
      </ul>
    </div>
  );
}