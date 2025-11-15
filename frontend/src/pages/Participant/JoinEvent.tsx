import React from "react";
import UploadSelfie from "./UploadSelfie";

const JoinEvent: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Join Event</h2>
      <UploadSelfie />
    </div>
  );
};

export default JoinEvent;
