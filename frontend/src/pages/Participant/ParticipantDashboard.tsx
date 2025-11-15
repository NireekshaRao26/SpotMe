// src/pages/Participant/ParticipantDashboard.tsx
import { Link } from "react-router-dom";

export default function ParticipantDashboard() {
  return (
    <div className="max-w-3xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold text-center mb-6">
        Participant Dashboard
      </h1>

      <div className="flex flex-col gap-4 items-center">
        <Link
          to="/participant/upload-selfie"
          className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700"
        >
          🔍 Find My Photos
        </Link>
      </div>
    </div>
  );
}
