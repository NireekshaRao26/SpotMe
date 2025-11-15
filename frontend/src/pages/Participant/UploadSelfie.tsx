import React, { useState } from "react";

const UploadSelfie: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);

      // Preview the selfie
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage("Please select a selfie to upload.");
      return;
    }

    setUploading(true);
    setMessage("");

    try {
      // Mock upload process (replace with your API call)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Example API call:
      // const formData = new FormData();
      // formData.append("selfie", selectedFile);
      // await axios.post("/api/upload-selfie", formData);

      setMessage("Selfie uploaded successfully!");
      setSelectedFile(null);
      setPreview(null);
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
      <h2 className="text-xl font-semibold mb-4 text-center">Upload Selfie</h2>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4 w-full"
      />

      {preview && (
        <div className="mb-4">
          <p className="font-medium mb-2">Preview:</p>
          <img
            src={preview}
            alt="Selfie Preview"
            className="w-48 h-48 object-cover rounded-full mx-auto border"
          />
        </div>
      )}

      {message && <p className="mb-4 text-center text-sm text-gray-700">{message}</p>}

      <button
        onClick={handleUpload}
        disabled={uploading}
        className={`w-full py-2 px-4 rounded-md text-white ${
          uploading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {uploading ? "Uploading..." : "Upload Selfie"}
      </button>
    </div>
  );
};

export default UploadSelfie;
