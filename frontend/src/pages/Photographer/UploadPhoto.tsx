import { useState } from "react";
import { uploadPhoto } from "../../api/endpoints";
import { useSearchParams } from "react-router-dom";
import Loading from "../../components/loading";

export default function UploadPhoto() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [params] = useSearchParams();
  const eventCode = params.get("event_code") || "";

  // If event code missing, block upload
  if (!eventCode) {
    return (
      <div className="p-6 max-w-md mx-auto mt-10 bg-white shadow rounded">
        <h2 className="text-2xl font-bold mb-4">Upload Photo</h2>

        <p className="text-red-600 font-semibold">
          ❌ No event code provided. Go back and enter Event Code in
          Photographer Dashboard.
        </p>
      </div>
    );
  }

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a photo first!");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await uploadPhoto(file, eventCode);
      alert("Uploaded Successfully!");
      console.log("Upload Response:", res.data);
    } catch (err: any) {
      console.error(err);

      const msg = err.response?.data?.detail || "Upload failed.";
      setError(msg);
      alert("Error: " + msg); // Shows "Invalid event code"
    }

    setLoading(false);
  };

  // Show loading spinner
  if (loading) return <Loading />;

  return (
    <div className="p-6 max-w-md mx-auto mt-10 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Upload Photo</h2>

      {/* Show the event code */}
      <p className="text-gray-700 mb-2">
        Uploading to Event: <b>{eventCode}</b>
      </p>

      {/* Show error */}
      {error && <p className="text-red-600 font-medium mb-3">❌ {error}</p>}

      <input
        type="file"
        className="mt-4 w-full border p-2 rounded"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
      />

      <button
        onClick={handleUpload}
        className="w-full mt-4 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
      >
        Upload Photo
      </button>
    </div>
  );
}
