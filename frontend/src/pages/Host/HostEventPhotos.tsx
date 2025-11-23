import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api, API_BASE_URL } from "../../api/axios";

interface Photo {
  image_name: string;
  file_url: string;
}

interface Overview {
  event_code: string;
  event_name: string;
  created_at: string;
  total_photos: number;
  photos_today: number;
  recent_photos: Photo[];
  photographer_stats: Record<string, number>;
}

export default function HostEventPhotos() {
  const { event_code } = useParams();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [overview, setOverview] = useState<Overview | null>(null);

  useEffect(() => {
    if (!event_code) return;

    // Fetch photos
    api
      .get(`/photos/list/${event_code}`)
      .then((res) => setPhotos(res.data))
      .catch((err) => console.error("Failed to fetch photos:", err));

    // Fetch overview
    api
      .get(`/events/overview/${event_code}`)
      .then((res) => setOverview(res.data))
      .catch((err) => console.error("Failed to fetch overview:", err));
  }, [event_code]);

  const buildUrl = (file_url: string) => {
    if (!file_url) return "";
    if (file_url.startsWith("http://") || file_url.startsWith("https://"))
      return file_url;
    return `${API_BASE_URL.replace(/\/$/, "")}/${file_url.replace(/^\/+/, "")}`;
  };

  return (
    <div className="min-h-screen bg-[#0F172A] relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-96 h-96 bg-[#6366F1]/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 left-20 w-96 h-96 bg-[#EC4899]/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1.5s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#A5B4FC]/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "3s" }}
        ></div>
      </div>

      <div className="relative z-10 p-6 max-w-7xl mx-auto">
        {/* ---------- NEW OVERVIEW BOX ---------- */}
        {overview && (
          <div className="mb-10 p-8 bg-gradient-to-br from-[#6366F1]/10 to-[#EC4899]/10 rounded-3xl border border-[#A5B4FC]/30 shadow-xl backdrop-blur-xl">
            <h2 className="text-3xl font-extrabold text-[#E2E8F0] mb-2">
              {overview.event_name}
            </h2>

            <p className="text-[#A5B4FC] mb-3">
              Event Code:{" "}
              <span className="text-[#EC4899] font-semibold">
                {overview.event_code}
              </span>
            </p>

            <div className="grid sm:grid-cols-3 gap-4 mb-6">
              <div className="p-4 bg-[#0F172A]/60 rounded-xl border border-[#6366F1]/30">
                <p className="text-[#A5B4FC] text-sm">Total Photos</p>
                <p className="text-3xl font-bold text-[#E2E8F0]">
                  {overview.total_photos}
                </p>
              </div>

              <div className="p-4 bg-[#0F172A]/60 rounded-xl border border-[#EC4899]/30">
                <p className="text-[#A5B4FC] text-sm">Photos Today</p>
                <p className="text-3xl font-bold text-[#E2E8F0]">
                  {overview.photos_today}
                </p>
              </div>

              <div className="p-4 bg-[#0F172A]/60 rounded-xl border border-[#A5B4FC]/30">
                <p className="text-[#A5B4FC] text-sm">Photographers</p>
                <p className="text-3xl font-bold text-[#E2E8F0]">
                  {Object.keys(overview.photographer_stats).length}
                </p>
              </div>
            </div>

            {/* Recent photos */}
            {overview.recent_photos.length > 0 && (
              <>
                <p className="text-[#E2E8F0] font-semibold mb-2">
                  Recent Uploads
                </p>
                <div className="flex gap-3">
                  {overview.recent_photos.map((rp) => (
                    <img
                      key={rp.image_name}
                      src={buildUrl(rp.file_url)}
                      alt="recent"
                      className="w-24 h-24 rounded-xl object-cover border border-[#A5B4FC]/40 shadow-md"
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}
        {/* ---------- END OVERVIEW BOX ---------- */}

        {/* ORIGINAL TITLE */}
        <div className="mb-8">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-[#6366F1] via-[#A5B4FC] to-[#EC4899] bg-clip-text text-transparent mb-3 animate-pulse">
            Event Photos
          </h1>
          <p className="text-[#E2E8F0] text-lg">
            <span className="text-[#A5B4FC] font-bold bg-gradient-to-r from-[#6366F1]/20 to-[#EC4899]/20 px-3 py-1 rounded-lg">
              {event_code}
            </span>{" "}
            •{" "}
            <span className="text-[#6366F1] font-semibold">
              {photos.length}
            </span>{" "}
            photos
          </p>
        </div>

        {/* PHOTO GRID (unchanged) */}
        {photos.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-block p-10 bg-gradient-to-br from-[#6366F1]/10 to-[#EC4899]/10 rounded-3xl border-2 border-[#A5B4FC]/30 backdrop-blur-xl">
              <p className="text-[#E2E8F0] text-xl mb-3 font-semibold">
                No photos uploaded yet
              </p>
              <p className="text-[#A5B4FC] text-sm">
                Photos will appear here once photographers start uploading
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos.map((p) => (
              <div
                key={p.image_name}
                className="group relative aspect-square overflow-hidden rounded-2xl border-2 border-[#A5B4FC]/30 hover:border-[#6366F1] transition-all duration-300 bg-gradient-to-br from-[#6366F1]/5 to-[#EC4899]/5 backdrop-blur-sm shadow-lg hover:shadow-2xl hover:shadow-[#EC4899]/30"
              >
                <img
                  src={buildUrl(p.file_url)}
                  alt={p.image_name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/90 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-[#E2E8F0] text-xs font-semibold truncate">
                      {p.image_name}
                    </p>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!confirm("Delete this photo permanently?")) return;

                    api.delete(`/photos/delete/${p.image_name}`).then(() => {
                      setPhotos((old) =>
                        old.filter((x) => x.image_name !== p.image_name)
                      );
                    });
                  }}
                  title="Delete photo"
                  aria-label={`Delete ${p.image_name}`}
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-200 bg-black/40 hover:bg-black/50 text-white p-1.5 rounded-full shadow-md hover:scale-105 z-20 backdrop-blur-sm"
                >
                  <span className="text-sm leading-none">✕</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
