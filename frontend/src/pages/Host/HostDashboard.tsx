import { useEffect, useState } from "react";
import { listHostEvents } from "../../api/endpoints";
import EventCard from "../../components/eventCard";
import { useNavigate } from "react-router-dom";

export default function HostDashboard() {
  const [events, setEvents] = useState<any[]>([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchEvents = async () => {
    try {
      const res = await listHostEvents();
      setEvents(res.data);
    } catch (err) {
      setError("Could not fetch events");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-[#0F172A] relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-96 h-96 bg-[#6366F1]/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 left-20 w-96 h-96 bg-[#EC4899]/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1.5s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#A5B4FC]/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "3s" }}
        ></div>
      </div>

      <div className="relative z-10 p-6 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-5xl font-extrabold bg-gradient-to-r from-[#6366F1] via-[#A5B4FC] to-[#EC4899] bg-clip-text text-transparent mb-3 animate-pulse">
              Host Dashboard
            </h1>
            <p className="text-[#E2E8F0] text-lg">
              Manage your events and grow your audience
            </p>
          </div>

          <button
            onClick={() => navigate("/host/create-event")}
            className="bg-gradient-to-r from-[#6366F1] to-[#EC4899] text-white px-8 py-4 rounded-2xl font-bold shadow-2xl shadow-[#EC4899]/50 hover:shadow-[#EC4899]/80 transform hover:scale-105 transition-all duration-300 border border-[#A5B4FC]/30"
          >
            Create Event
          </button>
        </div>

        {error && (
          <div className="bg-red-500/10 border-2 border-red-400/50 text-red-300 px-5 py-4 rounded-2xl mb-6 backdrop-blur-sm">
            {error}
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.length === 0 ? (
            <div className="col-span-full text-center py-16">
              <div className="inline-block p-8 bg-gradient-to-br from-[#6366F1]/10 to-[#EC4899]/10 rounded-3xl border-2 border-[#A5B4FC]/30 backdrop-blur-xl">
                <p className="text-[#E2E8F0] text-xl mb-4 font-semibold">
                  No events created yet.
                </p>
                <p className="text-[#A5B4FC] text-sm">
                  Create your first event to get started!
                </p>
              </div>
            </div>
          ) : (
            events.map((ev) => <EventCard key={ev.event_code} event={ev} />)
          )}
        </div>
      </div>
    </div>
  );
}
