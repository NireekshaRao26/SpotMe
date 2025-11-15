import React, { useEffect, useState } from "react";

interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  status: "upcoming" | "completed";
}

const PhotographerDashboard: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

  // Simulate fetching events from API
  useEffect(() => {
    const fetchEvents = async () => {
      // Replace with real API call
      const data: Event[] = [
        {
          id: "EVT-X4T29P",
          name: "Wedding Shoot",
          date: "2025-12-01",
          location: "Mumbai",
          status: "upcoming",
        },
        {
          id: "EVT-A1B2C3",
          name: "Birthday Party",
          date: "2025-11-20",
          location: "Pune",
          status: "completed",
        },
      ];
      setEvents(data);
    };

    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Photographer Dashboard</h1>
        <p className="text-gray-600">Manage your upcoming and past events</p>
      </header>

      <section>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Your Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-bold text-gray-800">{event.name}</h3>
              <p className="text-gray-600">Date: {event.date}</p>
              <p className="text-gray-600">Location: {event.location}</p>
              <p
                className={`mt-2 font-semibold ${
                  event.status === "upcoming" ? "text-green-600" : "text-gray-500"
                }`}
              >
                Status: {event.status}
              </p>
              <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                View Details
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PhotographerDashboard;
