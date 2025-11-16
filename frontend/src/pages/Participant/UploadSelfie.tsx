import { useState } from "react";
import { searchPhotos } from "../../api/endpoints";
import { API_BASE_URL } from "../../api/axios";

export default function UploadSelfie() {
  const [file, setFile] = useState<File | null>(null);
  const [eventCode, setEventCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setError("");

    if (!eventCode) {
      setError("Event code is required!");
      return;
    }
    if (!file) {
      setError("Please upload your selfie.");
      return;
    }

    setLoading(true);

    try {
      const res = await searchPhotos(file, eventCode);
      const matches = res.data.results?.[0] ?? [];
      setResults(matches);
    } catch (err: any) {
      const msg = err.response?.data?.detail || "Search failed.";
      setError(msg);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0F172A] relative overflow-hidden py-12 px-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-80 h-80 bg-[#6366F1]/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 left-20 w-96 h-96 bg-[#EC4899]/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1.5s" }}
        ></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-[#6366F1] via-[#A5B4FC] to-[#EC4899] bg-clip-text text-transparent mb-3">
            Find My Photos
          </h2>
          <p className="text-[#E2E8F0] text-lg">
            Upload your selfie to discover your event moments
          </p>
        </div>

        <div className="bg-gradient-to-br from-[#6366F1]/10 to-[#EC4899]/10 backdrop-blur-2xl p-8 rounded-3xl shadow-2xl border-2 border-[#A5B4FC]/40 shadow-[#6366F1]/20 mb-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-[#A5B4FC] mb-3 uppercase tracking-wide">
                Event Code
              </label>
              <input
                type="text"
                value={eventCode}
                onChange={(e) => setEventCode(e.target.value)}
                className="w-full px-5 py-4 bg-[#0F172A]/80 border-2 border-[#A5B4FC]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-300 text-[#E2E8F0] placeholder-[#A5B4FC]/50 font-medium text-center uppercase tracking-widest"
                placeholder="e.g., EVT-ABC123"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-[#A5B4FC] mb-3 uppercase tracking-wide">
                Upload Your Selfie
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                className="w-full px-5 py-4 bg-[#0F172A]/80 border-2 border-[#A5B4FC]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-300 text-[#E2E8F0] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-gradient-to-r file:from-[#6366F1] file:to-[#EC4899] file:text-white file:font-semibold file:cursor-pointer hover:file:shadow-lg"
              />
              {file && (
                <p className="text-[#A5B4FC] text-sm mt-2 font-medium">
                  Selected: {file.name}
                </p>
              )}
            </div>

            {error && (
              <div className="bg-red-500/15 border-2 border-red-400/50 text-red-300 px-5 py-4 rounded-xl backdrop-blur-sm">
                {error}
              </div>
            )}

            <button
              onClick={handleSearch}
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-[#6366F1] to-[#EC4899] text-white font-bold rounded-xl shadow-2xl shadow-[#EC4899]/50 hover:shadow-[#EC4899]/80 transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none border border-[#A5B4FC]/30 text-lg"
            >
              {loading ? "Searching..." : "Search Photos"}
            </button>
          </div>
        </div>

        {results.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold text-[#E2E8F0] mb-6">
              Your Photos ({results.length})
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((r: any) => {
                const previewUrl = `${API_BASE_URL}/uploads/${
                  r.event_code
                }/${encodeURIComponent(r.image_name)}`;

                const downloadUrl = `${API_BASE_URL}/download/${
                  r.event_code
                }/${encodeURIComponent(r.image_name)}`;

                const handleDownload = async () => {
                  try {
                    const response = await fetch(downloadUrl);
                    if (!response.ok) throw new Error("Download failed");
                    const blob = await response.blob();
                    const link = document.createElement("a");
                    link.href = URL.createObjectURL(blob);
                    link.download = r.image_name;
                    link.click();
                    URL.revokeObjectURL(link.href);
                  } catch (error) {
                    alert("Failed to download image. Try again.");
                  }
                };

                return (
                  <div
                    key={r.image_name}
                    className="group bg-gradient-to-br from-[#6366F1]/10 to-[#EC4899]/10 backdrop-blur-xl border-2 border-[#A5B4FC]/30 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-[#EC4899]/30 transition-all duration-300 hover:scale-105"
                  >
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={previewUrl}
                        alt={r.image_name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>

                    <div className="p-4 bg-[#0F172A]/60 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[#A5B4FC] text-sm font-semibold">
                          Match Score
                        </span>
                        <span className="text-[#E2E8F0] font-bold">
                          {(r.score * 100).toFixed(1)}%
                        </span>
                      </div>

                      <button
                        onClick={handleDownload}
                        className="w-full py-2 bg-gradient-to-r from-[#6366F1] to-[#EC4899] text-white font-semibold rounded-lg shadow-md hover:shadow-[#EC4899]/50 transition-all"
                      >
                        Download
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {results.length === 0 && !loading && !error && (
          <div className="text-center py-12">
            <div className="inline-block bg-gradient-to-br from-[#6366F1]/10 to-[#EC4899]/10 backdrop-blur-xl p-8 rounded-3xl border-2 border-[#A5B4FC]/30">
              <p className="text-[#E2E8F0] text-lg font-semibold">
                No photos found yet
              </p>
              <p className="text-[#A5B4FC] text-sm mt-2">
                Upload your selfie and search to find your moments
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
