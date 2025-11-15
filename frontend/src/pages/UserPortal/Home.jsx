import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UploadSelfie from "./UploadSelfie";
export default function Home() {
  const [eventCode, setEventCode] = useState("");
  const [selfie, setSelfie] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSelfieUpload = (e) => {
    setSelfie(e.target.files[0]);
  };

  const handleSearch = async () => {
    if (!eventCode || !selfie) {
      alert("Please enter event code and upload a selfie.");
      return;
    }

    const formData = new FormData();
    formData.append("event_code", eventCode);
    formData.append("selfie", selfie);

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:8000/api/search", // Change to your FastAPI route
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      // Navigate to result page with response data
      navigate("/results", { state: { photos: res.data.matches } });
    } catch (error) {
      console.error(error);
      alert("Error searching photos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-gray-50">
      <h1 className="text-4xl font-bold mb-6">SPOTME</h1>
      <p className="text-gray-600 mb-10 text-center">
        Enter your event code and upload a selfie to find your photos.
      </p>

      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 space-y-5">

        {/* Event Code */}
        <div>
          <label className="block mb-2 font-medium">Event Code</label>
          <input
            type="text"
            value={eventCode}
            onChange={(e) => setEventCode(e.target.value)}
            placeholder="Enter event code"
            className="w-full border rounded-lg p-2"
          />
        </div>

        {/* Selfie Upload */}
        <div>
          <label className="block mb-2 font-medium">Upload Selfie</label>
         <UploadSelfie onFileSelect={(file) => setSelfie(file)} />

        </div>

        {/* Submit Button */}
        <button
          disabled={loading}
          onClick={handleSearch}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
        >
          {loading ? "Searching..." : "Find My Photos"}
        </button>
      </div>
    </div>
  );
}
