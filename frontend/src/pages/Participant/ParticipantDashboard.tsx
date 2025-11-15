import React from "react";
import { Link } from "react-router-dom";
import SearchPage from "./SearchPage";

const ParticipantDashboard: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Participant Dashboard
      </h1>

      <div className="flex justify-center gap-4 mb-6">
        <Link to="/participant/search" className="text-blue-600 underline">
          Search Photos
        </Link>
        <Link to="/participant/join" className="text-blue-600 underline">
          Join Event
        </Link>
        <Link
          to="/participant/upload-selfie"
          className="text-blue-600 underline"
        >
          Upload Selfie
        </Link>
      </div>

      {/* Render search with empty photos by default */}
      <SearchPage photos={[]} />
    </div>
  );
};

export default ParticipantDashboard;
