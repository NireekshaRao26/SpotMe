import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PhotographerDashboard() {
  const [eventCode, setEventCode] = useState("");
  const navigate = useNavigate();

  const handleContinue = () => {
    if (!eventCode) return alert("Enter event code");
    navigate(`/photographer/upload?event_code=${eventCode}`);
  };

  return (
    <div className="p-6 max-w-md mx-auto mt-10 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Photographer Dashboard</h1>
      <p className="text-gray-600 mb-4">
        Enter the Event Code provided by the Host.
      </p>

      <input
        className="border p-2 w-full rounded"
        placeholder="Enter Event Code"
        value={eventCode}
        onChange={(e) => setEventCode(e.target.value)}
      />

      <button
        className="w-full mt-4 bg-blue-600 text-white py-2 rounded"
        onClick={handleContinue}
      >
        Continue
      </button>
    </div>
  );
}
