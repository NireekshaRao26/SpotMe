import { useEffect, useState } from "react";
import { listHostEvents } from "../../api/endpoints";
import EventCard from "../../components/eventCard";

export default function HostEvents() {
  const [events, setEvents] = useState<any[]>([]);
  const [error, setError] = useState("");

  const loadEvents = async () => {
    try {
      const res = await listHostEvents();
      setEvents(res.data);
    } catch (err) {
      setError("Failed to load events");
    }
  };

  useEffect(() => {
    loadEvents();
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
          className="absolute top-1/3 right-1/3 w-[450px] h-[450px] bg-[#A5B4FC]/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2.5s" }}
        ></div>
      </div>

      <div className="relative z-10 p-6 max-w-6xl mx-auto">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-[#6366F1] via-[#A5B4FC] to-[#EC4899] bg-clip-text text-transparent mb-3 animate-pulse">
          My Events
        </h1>
        <p className="text-[#E2E8F0] text-lg mb-8">
          View and manage all your events
        </p>

        {error && (
          <div className="bg-red-500/10 border-2 border-red-400/50 text-red-300 px-5 py-4 rounded-2xl mb-6 backdrop-blur-sm">
            {error}
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.length === 0 ? (
            <div className="col-span-full text-center py-16">
              <div className="inline-block p-8 bg-gradient-to-br from-[#6366F1]/10 to-[#EC4899]/10 rounded-3xl border-2 border-[#A5B4FC]/30 backdrop-blur-xl">
                <p className="text-[#E2E8F0] text-xl font-semibold">
                  You haven't created any events yet.
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
