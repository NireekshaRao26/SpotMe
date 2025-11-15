import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../api/axios";

export default function PhotographerDashboard() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axiosInstance.get("/photographer/events");
        setEvents(res.data);
      } catch (err) {
        console.error("Failed to load events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-semibold mb-4">Photographer Dashboard</h1>
      <p className="text-gray-600 mb-6">
        Upload event photos and manage your assigned events.
      </p>

      <Link
        to="/photographer/upload"
        className="inline-block bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
      >
        Upload Photos
      </Link>

      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-3">Your Assigned Events</h2>

        {loading ? (
          <p className="text-gray-500">Loading events...</p>
        ) : events.length === 0 ? (
          <p className="text-gray-500">No events assigned yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {events.map((ev) => (
              <div
                key={ev.id}
                className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
              >
                <h3 className="text-lg font-medium">{ev.event_name}</h3>
                <p className="text-gray-500 text-sm">Code: {ev.event_code}</p>
                <p className="text-gray-500 text-sm mt-2">
                  Date: {ev.date || "—"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
