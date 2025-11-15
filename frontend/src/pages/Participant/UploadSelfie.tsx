import { useState } from "react";
import { searchPhotos } from "../../api/endpoints";
import { API_BASE_URL } from "../../api/axios";

export default function UploadSelfie() {
  const [file, setFile] = useState<File | null>(null);
  const [eventCode, setEventCode] = useState("");
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = async () => {
    if (!file || !eventCode) return alert("Provide selfie and event code");
    try {
      const res = await searchPhotos(file, eventCode);
      const matches = res.data.results?.[0] ?? [];
      setResults(matches);
    } catch (err: any) {
      console.error(err);
      alert("Search failed: " + (err.response?.data?.detail || err.message));
    }
  };

  return (
    <div>
      <h2>Find My Photos</h2>
      <input
        type="text"
        placeholder="Event code"
        value={eventCode}
        onChange={(e) => setEventCode(e.target.value)}
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
      />
      <button onClick={handleSearch}>Search</button>

      <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
        {results.map((r: any) => (
          <div key={r.image_name}>
            <img
              src={`${API_BASE_URL}/uploads/${r.event_code}/${r.image_name}`}
              alt=""
              style={{ width: 200 }}
            />
            <div>score: {r.score.toFixed(3)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
