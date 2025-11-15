import React from "react";
import { useNavigate } from "react-router-dom";

interface Event {
  name: string;
  event_code: string;
}

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/host/event/${event.event_code}`)}
      className="border rounded-lg p-4 shadow-md hover:shadow-lg cursor-pointer transition-all"
    >
      <h2 className="text-xl font-semibold">{event.name}</h2>
      <p className="text-gray-600 mt-1">Event Code: {event.event_code}</p>
    </div>
  );
};

export default EventCard;
