import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getParticipantProfile, getRecentSearches } from "../../api/endpoints";

export default function ParticipantDashboard() {
  const [profile, setProfile] = useState<any>(null);
  const [recent, setRecent] = useState<any[]>([]);

  useEffect(() => {
    getParticipantProfile()
      .then((res) => setProfile(res.data))
      .catch(() => setProfile(null));

    getRecentSearches()
      .then((res) => setRecent(res.data))
      .catch(() => setRecent([]));
  }, []);

  return (
    <div className="min-h-screen bg-[#0F172A] relative overflow-hidden">
      {/* background animations */}
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
        {/* Title */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-[#6366F1] via-[#A5B4FC] to-[#EC4899] bg-clip-text text-transparent mb-4 animate-pulse">
            Participant Dashboard
          </h1>
          <p className="text-[#E2E8F0] text-lg">
            Welcome! Find your photos from any event
          </p>
        </div>

        {/* --- MAIN GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* --- Left: Profile Sidebar --- */}
          <div className="lg:col-span-1 bg-[#1E293B]/60 rounded-3xl p-6 border border-[#A5B4FC]/30 backdrop-blur-xl shadow-xl">
            <h2 className="text-xl font-bold text-[#E2E8F0] mb-4">
              My Profile
            </h2>

            {profile ? (
              <div className="space-y-3">
                <p className="text-[#A5B4FC]">
                  <span className="font-semibold text-[#EC4899]">
                    Username:
                  </span>{" "}
                  {profile.username}
                </p>

                <p className="text-[#A5B4FC]">
                  <span className="font-semibold text-[#EC4899]">Role:</span>{" "}
                  {profile.role}
                </p>

                <p className="text-[#A5B4FC]">
                  <span className="font-semibold text-[#EC4899]">
                    Joined at:
                  </span>{" "}
                  {new Date(profile.joined_at).toLocaleDateString()}
                </p>

                <p className="text-[#A5B4FC]">
                  <span className="font-semibold text-[#EC4899]">
                    Total Searches:
                  </span>{" "}
                  {profile.total_searches}
                </p>
              </div>
            ) : (
              <p className="text-[#A5B4FC]">Loading profile...</p>
            )}
          </div>

          {/* --- Right: Search Button + Recent Searches --- */}
          <div className="lg:col-span-2 space-y-8">
            {/* Find photos button */}
            <div className="bg-gradient-to-br from-[#6366F1]/10 to-[#EC4899]/10 backdrop-blur-2xl p-12 rounded-3xl shadow-2xl border-2 border-[#A5B4FC]/40 shadow-[#6366F1]/20">
              <div className="flex flex-col gap-6 items-center">
                <Link
                  to="/participant/upload-selfie"
                  className="block w-full py-6 bg-gradient-to-r from-[#6366F1] to-[#EC4899] text-white font-bold rounded-2xl shadow-2xl shadow-[#EC4899]/50 hover:shadow-[#EC4899]/80 transform hover:scale-105 transition-all duration-300 border border-[#A5B4FC]/30 text-xl text-center"
                >
                  Find My Photos
                </Link>
                <p className="text-[#A5B4FC] text-sm font-medium">
                  Upload your selfie and event code to discover all photos
                  featuring you
                </p>
              </div>
            </div>

            {/* Recent Searches */}
            <div className="bg-[#1E293B]/60 rounded-3xl p-6 border border-[#A5B4FC]/30 backdrop-blur-xl shadow-lg">
              <h2 className="text-xl font-bold text-[#E2E8F0] mb-4">
                Recent Searches
              </h2>

              {recent.length === 0 ? (
                <p className="text-[#A5B4FC]">No previous searches.</p>
              ) : (
                <div className="space-y-3">
                  {recent.map((r) => (
                    <div
                      key={r.event_code}
                      className="p-4 rounded-xl bg-[#0F172A]/40 border border-[#A5B4FC]/20"
                    >
                      <p className="text-[#E2E8F0] font-semibold">
                        Event: {r.event_code}
                      </p>
                      <p className="text-[#A5B4FC] text-sm">
                        {new Date(r.searched_at).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
