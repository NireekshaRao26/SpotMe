// src/pages/Participant/UploadSelfie.tsx
import { useState } from "react";
import { searchPhotos } from "../../api/endpoints";
import { API_BASE_URL } from "../../api/axios";

export default function UploadSelfie() {
  const [file, setFile] = useState<File | null>(null);
  const [eventCode, setEventCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setError("");

    if (!eventCode) {
      setError("Event code is required!");
      return;
    }
    if (!file) {
      setError("Please upload your selfie.");
      return;
    }

    setLoading(true);

    try {
      const res = await searchPhotos(file, eventCode);
      const matches = res.data.results?.[0] ?? [];
      setResults(matches);
    } catch (err: any) {
      const msg = err.response?.data?.detail || "Search failed.";
      setError(msg);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">Find My Photos</h2>

      <label className="block mb-2 font-medium">Event Code</label>
      <input
        type="text"
        value={eventCode}
        onChange={(e) => setEventCode(e.target.value)}
        className="w-full p-2 border rounded mb-4"
        placeholder="Enter event code"
      />

      <label className="block mb-2 font-medium">Upload Selfie</label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        className="w-full p-2 border rounded"
      />

      {error && <p className="text-red-600 mt-3 font-semibold">❌ {error}</p>}

      <button
        onClick={handleSearch}
        className="w-full mt-4 bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        {loading ? "Searching..." : "Search Photos"}
      </button>

      {/* RESULTS */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {results.map((r: any) => (
          <div key={r.image_name} className="border rounded shadow p-2">
            <img
              src={`${API_BASE_URL}/uploads/${r.event_code}/${r.image_name}`}
              alt=""
              className="w-full h-40 object-cover rounded"
            />
            <p className="mt-2 text-sm text-gray-700">
              Score: {r.score.toFixed(3)}
            </p>
          </div>
        ))}
      </div>

      {results.length === 0 && !loading && !error && (
        <p className="text-center text-gray-500 mt-4">No photos found yet.</p>
      )}
    </div>
  );
}
