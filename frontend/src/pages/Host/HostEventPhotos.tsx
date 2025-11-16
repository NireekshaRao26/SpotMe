import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api, API_BASE_URL } from "../../api/axios";

interface Photo {
  image_name: string;
  file_url: string;
}

export default function HostEventPhotos() {
  const { event_code } = useParams();
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    if (!event_code) return;

    api
      .get(`/photos/list/${event_code}`)
      .then((res) => {
        setPhotos(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch photos:", err);
      });
  }, [event_code]);

  const buildUrl = (file_url: string) => {
    if (!file_url) return "";
    if (file_url.startsWith("http://") || file_url.startsWith("https://"))
      return file_url;
    return `${API_BASE_URL.replace(/\/$/, "")}/${file_url.replace(/^\/+/, "")}`;
  };

  return (
    <div className="min-h-screen bg-[#0F172A] relative overflow-hidden">
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
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
