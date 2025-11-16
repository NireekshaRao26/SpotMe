import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

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
import Navbar from "./components/navbar";

function AppRoutes() {
  const location = useLocation();
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, [location]);

  const hideOn = ["/", "/login", "/signup"];
  const showNavbar = token && !hideOn.includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/host" element={<HostDashboard />} />
          <Route path="/host/create-event" element={<CreateEvent />} />
          <Route path="/host/event/:event_code" element={<HostEventPhotos />} />
          <Route path="/photographer" element={<PhotographerDashboard />} />
          <Route path="/photographer/upload" element={<UploadPhoto />} />
          <Route path="/participant" element={<ParticipantDashboard />} />
          <Route path="/participant/upload-selfie" element={<UploadSelfie />} />
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
