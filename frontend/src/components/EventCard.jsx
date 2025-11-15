import React from "react";

const EventCard = ({ event, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="border rounded-lg p-4 shadow-md hover:shadow-lg cursor-pointer transition-all"
    >
      <h2 className="text-xl font-semibold">{event.name}</h2>
      <p className="text-gray-600 mt-1">Event Code: {event.event_code}</p>
      <p className="text-gray-500 text-sm mt-2">
        Created On: {new Date(event.created_at).toLocaleDateString()}
      </p>
    </div>
  );
};

export default EventCard;
