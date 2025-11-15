import { useState } from "react";
import { uploadPhoto } from "../../api/endpoints";

export default function UploadPhoto() {
  const [file, setFile] = useState<File | null>(null);
  const [eventCode, setEventCode] = useState("");

  const handleUpload = async () => {
    if (!file || !eventCode) return alert("Select file and event code");
    try {
      const res = await uploadPhoto(file, eventCode);
      alert("Upload OK: " + JSON.stringify(res.data));
    } catch (err: any) {
      console.error(err);
      alert("Upload failed: " + (err.response?.data?.detail || err.message));
    }
  };

  return (
    <div>
      <h2>Upload Photo</h2>
      <input
        type="text"
        placeholder="Event code"
        value={eventCode}
        onChange={(e) => setEventCode(e.target.value)}
      />
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
      />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}
