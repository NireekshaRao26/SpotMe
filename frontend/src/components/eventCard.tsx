import React from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/axios";

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
      className="group relative bg-gradient-to-br from-[#6366F1]/15 to-[#EC4899]/15 backdrop-blur-xl border-2 border-[#A5B4FC]/40 rounded-2xl p-8 shadow-2xl shadow-[#6366F1]/20 hover:shadow-[#EC4899]/40 cursor-pointer transition-all duration-300 hover:scale-105 hover:border-[#EC4899]/60 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#6366F1]/10 to-[#EC4899]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <h2 className="text-2xl font-bold text-[#E2E8F0] group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#6366F1] group-hover:to-[#EC4899] group-hover:bg-clip-text transition-all duration-300">
            {event.name}
          </h2>
        </div>

        <div className="bg-[#0F172A]/60 rounded-xl px-4 py-3 border border-[#A5B4FC]/30">
          <p className="text-[#A5B4FC] text-sm font-semibold uppercase tracking-wider">
            Event Code
          </p>
          <p className="text-[#E2E8F0] text-lg font-bold mt-1 tracking-widest">
            {event.event_code}
          </p>
        </div>

        <div className="mt-4 flex items-center text-[#A5B4FC] group-hover:text-[#EC4899] transition-colors duration-300">
          <span className="text-sm font-semibold">View Details</span>
          <svg
            className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (confirm("Are you sure you want to delete this event?")) {
              api.delete(`/events/delete/${event.event_code}`).then(() => {
                window.location.reload();
              });
            }
          }}
          title="Delete event"
          aria-label={`Delete event ${event.event_code}`}
          className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-200 bg-black/40 hover:bg-black/50 text-white p-1.5 rounded-full shadow-md hover:scale-105 z-20 backdrop-blur-sm"
        >
          <span className="text-sm leading-none">✕</span>
        </button>
      </div>
    </div>
  );
};

export default EventCard;
