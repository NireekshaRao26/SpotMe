import { useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

const CreateEvent = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await api.post("/host/create-event", { name });

      alert("Event created successfully!");
      navigate("/host/events");

    } catch (err: any) {
      setError(err.response?.data?.detail || "Event creation failed");
    }

    setLoading(false);
  };

  return (
    <div className="p-6 max-w-md mx-auto mt-8 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Create Event</h2>

      <form onSubmit={handleCreate}>
        {error && <p className="text-red-500 mb-2">{error}</p>}

        <input
          className="input"
          placeholder="Event Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button className="btn-primary mt-4 w-full" disabled={loading}>
          {loading ? "Creating..." : "Create Event"}
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
