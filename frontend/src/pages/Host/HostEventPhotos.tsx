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
        // optionally handle/log error
        console.error("Failed to fetch photos:", err);
      });
  }, [event_code]);

  const buildUrl = (file_url: string) => {
    if (!file_url) return "";
    // If already absolute, return as-is
    if (file_url.startsWith("http://") || file_url.startsWith("https://"))
      return file_url;
    // Make sure we don't accidentally concatenate without a slash
    return `${API_BASE_URL.replace(/\/$/, "")}/${file_url.replace(/^\/+/, "")}`;
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Photos for {event_code}</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {photos.map((p) => (
          <img
            key={p.image_name}
            src={buildUrl(p.file_url)}
            alt={p.image_name}
            className="rounded-lg shadow"
          />
        ))}
      </div>
    </div>
  );
}
