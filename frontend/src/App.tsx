import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";

import HostDashboard from "./pages/Host/HostDashboard";
import CreateEvent from "./pages/Host/CreateEvent";

import PhotographerDashboard from "./pages/Photographer/PhotographerDashboard";
import UploadPhoto from "./pages/Photographer/UploadPhoto";

import ParticipantDashboard from "./pages/Participant/ParticipantDashboard";
import UploadSelfie from "./pages/Participant/UploadSelfie";

import HostEventPhotos from "./pages/Host/HostEventPhotos";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          {/* HOME */}
          <Route path="/" element={<HomePage />} />

          {/* AUTH */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* HOST */}
          <Route path="/host" element={<HostDashboard />} />
          <Route path="/host/create-event" element={<CreateEvent />} />
          <Route path="/host/event/:event_code" element={<HostEventPhotos />} />

          {/* PHOTOGRAPHER */}
          <Route path="/photographer" element={<PhotographerDashboard />} />
          <Route path="/photographer/upload" element={<UploadPhoto />} />

          {/* PARTICIPANT */}
          <Route path="/participant" element={<ParticipantDashboard />} />
          <Route path="/participant/upload-selfie" element={<UploadSelfie />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
