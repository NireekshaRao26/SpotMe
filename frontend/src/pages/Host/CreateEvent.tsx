import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEvent } from "../../api/endpoints";

const CreateEvent = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!name.trim()) {
      setError("Event name cannot be empty");
      setLoading(false);
      return;
    }

    try {
      const res = await createEvent(name);
      alert("Event created: " + res.data.event_code);
      navigate("/host");
    } catch (err: any) {
      const msg =
        err.response?.data?.detail ||
        err.response?.data?.msg ||
        "Event creation failed";

      setError(String(msg));
    }

    setLoading(false);
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
            <h2 className="text-4xl font-extrabold bg-gradient-to-r from-[#6366F1] via-[#A5B4FC] to-[#EC4899] bg-clip-text text-transparent mb-3">
              Create Event
            </h2>
            <p className="text-[#E2E8F0] text-lg">Start something amazing</p>
          </div>

          <form onSubmit={handleCreate} className="space-y-6">
            {error && (
              <div className="bg-red-500/15 border-l-4 border-red-400 text-red-300 px-5 py-4 rounded-xl backdrop-blur-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-[#A5B4FC] mb-3 uppercase tracking-wide">
                Event Name
              </label>
              <input
                className="w-full px-5 py-4 bg-[#0F172A]/80 border-2 border-[#A5B4FC]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-300 text-[#E2E8F0] placeholder-[#A5B4FC]/50 font-medium"
                placeholder="e.g., Tech Fest 2025, Summer Concert..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-[#6366F1] to-[#EC4899] text-white font-bold rounded-xl shadow-2xl shadow-[#EC4899]/50 hover:shadow-[#EC4899]/80 transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none border border-[#A5B4FC]/30 text-lg"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-3"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Creating...
                </span>
              ) : (
                "Create Event"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate("/host")}
              className="text-[#A5B4FC] hover:text-[#E2E8F0] font-semibold transition-colors duration-300"
            >
              ← Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
