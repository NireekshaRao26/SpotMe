import { useEffect, useState } from "react";
import { api } from "../../api/axios";
import EventCard from "../../components/eventCard";

export default function HostEvents() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  const loadEvents = async () => {
    try {
      const res = await api.get("/host/events", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(res.data.events);
    } catch (err) {
      setError("Failed to load events");
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Events</h1>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <div className="grid md:grid-cols-2 gap-4">
        {events.length === 0 ? (
          <p>You haven't created any events yet.</p>
        ) : (
          events.map((event) => <EventCard key={event.id} event={event} />)
        )}
      </div>
    </div>
  );
}
