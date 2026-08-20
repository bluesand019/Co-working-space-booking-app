import "./ResourceCard.css";

const typeLabels = {
  hot_desk: "Hot Desk",
  private_office: "Private Office",
  meeting_room: "Meeting Room",
};

export default function ResourceCard({ resource }) {
  return (
    <div className="resource-card">
      <div className="resource-card-header">
        <h3>{resource.name}</h3>
        <span className="resource-type">{typeLabels[resource.type] || resource.type}</span>
      </div>
      <p className="resource-capacity">Seats up to {resource.capacity}</p>
    </div>
  );
}