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
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Host Dashboard</h1>

        <button
          onClick={() => navigate("/host/create-event")}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          + Create Event
        </button>
      </div>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <div className="grid md:grid-cols-2 gap-4">
        {events.length === 0 ? (
          <p className="text-gray-600">No events created yet.</p>
        ) : (
          events.map((ev) => <EventCard key={ev.event_code} event={ev} />)
        )}
      </div>
    </div>
  );
}
