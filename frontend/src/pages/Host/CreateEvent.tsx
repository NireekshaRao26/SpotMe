import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEvent } from "../../api/endpoints";

const CreateEvent = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!name.trim()) {
      setError("Event name cannot be empty");
      setLoading(false);
      return;
    }

    try {
      const res = await createEvent(name);
      alert("Event created: " + res.data.event_code);
      navigate("/host");
    } catch (err: any) {
      const msg =
        err.response?.data?.detail ||
        err.response?.data?.msg ||
        "Event creation failed";

      setError(String(msg));
    }

    setLoading(false);
  };

  return (
    <div className="p-6 max-w-md mx-auto mt-10 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Create Event</h2>

      <form onSubmit={handleCreate}>
        {error && <p className="text-red-600 mb-2">{error}</p>}

        <input
          className="border w-full px-4 py-2 rounded"
          placeholder="Event name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button
          className="bg-indigo-600 text-white w-full mt-4 py-2 rounded hover:bg-indigo-700"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Event"}
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
