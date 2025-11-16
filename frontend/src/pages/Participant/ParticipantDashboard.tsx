import { Link } from "react-router-dom";

export default function ParticipantDashboard() {
  return (
    <div className="min-h-screen bg-[#0F172A] relative overflow-hidden">
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

      <div className="relative z-10 p-6 max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-[#6366F1] via-[#A5B4FC] to-[#EC4899] bg-clip-text text-transparent mb-4 animate-pulse">
            Participant Dashboard
          </h1>
          <p className="text-[#E2E8F0] text-lg">
            Welcome! Find your photos from any event
          </p>
        </div>

        <div className="max-w-2xl mx-auto bg-gradient-to-br from-[#6366F1]/10 to-[#EC4899]/10 backdrop-blur-2xl p-12 rounded-3xl shadow-2xl border-2 border-[#A5B4FC]/40 shadow-[#6366F1]/20">
          <div className="flex flex-col gap-6 items-center">
            <div className="w-full max-w-md">
              <Link
                to="/participant/upload-selfie"
                className="block w-full py-6 bg-gradient-to-r from-[#6366F1] to-[#EC4899] text-white font-bold rounded-2xl shadow-2xl shadow-[#EC4899]/50 hover:shadow-[#EC4899]/80 transform hover:scale-105 transition-all duration-300 border border-[#A5B4FC]/30 text-xl text-center"
              >
                Find My Photos
              </Link>
            </div>

            <div className="text-center mt-4">
              <p className="text-[#A5B4FC] text-sm font-medium">
                Upload your selfie and event code to discover all photos
                featuring you
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
