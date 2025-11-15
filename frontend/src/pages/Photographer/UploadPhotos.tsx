import React, { useState } from "react";

const UploadPhotos: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      setMessage("Please select at least one photo to upload.");
      return;
    }

    setUploading(true);
    setMessage("");

    try {
      // Mock upload process (replace with your actual API call)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Example API call placeholder:
      // const formData = new FormData();
      // selectedFiles.forEach(file => formData.append("photos", file));
      // await axios.post("/api/upload", formData);

      setMessage(`${selectedFiles.length} photo(s) uploaded successfully!`);
      setSelectedFiles([]);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setMessage(`Upload failed: ${error.message}`);
      } else {
        setMessage("Upload failed. Please try again.");
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded-md">
      <h2 className="text-xl font-semibold mb-4 text-center">Upload Photos</h2>

      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4 w-full"
      />

      {selectedFiles.length > 0 && (
        <div className="mb-4">
          <h3 className="font-medium mb-2">Selected Photos:</h3>
          <ul className="list-disc list-inside">
            {selectedFiles.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}

      {message && <p className="mb-4 text-center text-sm text-gray-700">{message}</p>}

      <button
        onClick={handleUpload}
        disabled={uploading}
        className={`w-full py-2 px-4 rounded-md text-white ${
          uploading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {uploading ? "Uploading..." : "Upload Photos"}
      </button>
    </div>
  );
};

export default UploadPhotos;
