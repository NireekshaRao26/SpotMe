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
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-80 h-80 bg-[#6366F1]/25 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 left-20 w-96 h-96 bg-[#EC4899]/25 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1.5s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#A5B4FC]/15 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "3s" }}
        ></div>
      </div>

      <div className="relative z-10 w-full max-w-lg">
        <div className="bg-gradient-to-br from-[#6366F1]/10 to-[#EC4899]/10 backdrop-blur-2xl p-10 rounded-3xl shadow-2xl border-2 border-[#A5B4FC]/40 shadow-[#6366F1]/20">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-[#6366F1] via-[#A5B4FC] to-[#EC4899] bg-clip-text text-transparent mb-3">
              Photographer Dashboard
            </h1>
            <p className="text-[#E2E8F0] text-lg">
              Enter the Event Code provided by the Host
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-[#A5B4FC] mb-3 uppercase tracking-wide">
                Event Code
              </label>
              <input
                className="w-full px-5 py-4 bg-[#0F172A]/80 border-2 border-[#A5B4FC]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-300 text-[#E2E8F0] placeholder-[#A5B4FC]/50 font-medium text-center text-lg uppercase tracking-widest"
                placeholder="e.g., EVT-ABC123"
                value={eventCode}
                onChange={(e) => setEventCode(e.target.value)}
              />
            </div>

            <button
              className="w-full py-4 bg-gradient-to-r from-[#6366F1] to-[#EC4899] text-white font-bold rounded-xl shadow-2xl shadow-[#EC4899]/50 hover:shadow-[#EC4899]/80 transform hover:scale-[1.02] transition-all duration-300 border border-[#A5B4FC]/30 text-lg"
              onClick={handleContinue}
            >
              Continue to Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
