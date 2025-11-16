import { useState } from "react";
import { uploadPhoto } from "../../api/endpoints";
import { useSearchParams } from "react-router-dom";
import Loading from "../../components/loading";

export default function UploadPhoto() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [params] = useSearchParams();
  const eventCode = params.get("event_code") || "";

  if (!eventCode) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-80 h-80 bg-[#6366F1]/20 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-20 left-20 w-96 h-96 bg-[#EC4899]/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1.5s" }}
          ></div>
        </div>

        <div className="relative z-10 bg-gradient-to-br from-[#6366F1]/10 to-[#EC4899]/10 backdrop-blur-2xl p-10 rounded-3xl border-2 border-red-500/50 shadow-2xl max-w-lg">
          <h2 className="text-3xl font-extrabold bg-gradient-to-r from-[#6366F1] to-[#EC4899] bg-clip-text text-transparent mb-4">
            Upload Photo
          </h2>
          <p className="text-red-300 font-semibold text-lg">
            No event code provided. Go back and enter Event Code in Photographer
            Dashboard.
          </p>
        </div>
      </div>
    );
  }

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a photo first!");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await uploadPhoto(file, eventCode);
      alert("Uploaded Successfully!");
      console.log("Upload Response:", res.data);
    } catch (err: any) {
      console.error(err);

      const msg = err.response?.data?.detail || "Upload failed.";
      setError(msg);
      alert("Error: " + msg);
    }

    setLoading(false);
  };

  if (loading) return <Loading />;

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
            <h2 className="text-4xl font-extrabold bg-gradient-to-r from-[#6366F1] via-[#A5B4FC] to-[#EC4899] bg-clip-text text-transparent mb-4">
              Upload Photo
            </h2>

            <div className="inline-block bg-gradient-to-r from-[#6366F1]/20 to-[#EC4899]/20 px-5 py-2 rounded-xl border border-[#A5B4FC]/30">
              <p className="text-[#E2E8F0] text-sm">
                Event:{" "}
                <span className="text-[#A5B4FC] font-bold text-lg uppercase tracking-wider">
                  {eventCode}
                </span>
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {error && (
              <div className="bg-red-500/15 border-2 border-red-400/50 text-red-300 px-5 py-4 rounded-xl backdrop-blur-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-[#A5B4FC] mb-3 uppercase tracking-wide">
                Select Photo
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  className="w-full px-5 py-4 bg-[#0F172A]/80 border-2 border-[#A5B4FC]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-300 text-[#E2E8F0] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-gradient-to-r file:from-[#6366F1] file:to-[#EC4899] file:text-white file:font-semibold file:cursor-pointer hover:file:shadow-lg"
                  onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                />
              </div>
              {file && (
                <p className="text-[#A5B4FC] text-sm mt-2 font-medium">
                  Selected: {file.name}
                </p>
              )}
            </div>

            <button
              onClick={handleUpload}
              className="w-full py-4 bg-gradient-to-r from-[#6366F1] to-[#EC4899] text-white font-bold rounded-xl shadow-2xl shadow-[#EC4899]/50 hover:shadow-[#EC4899]/80 transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none border border-[#A5B4FC]/30 text-lg"
              disabled={!file}
            >
              Upload Photo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
