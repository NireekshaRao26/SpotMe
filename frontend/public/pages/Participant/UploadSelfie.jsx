import { useState } from "react";

export default function UploadSelfie({ onFileSelect }) {
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Basic validation
    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file.");
      return;
    }

    // Create preview
    const imageURL = URL.createObjectURL(file);
    setPreview(imageURL);

    // Send file to parent component
    if (onFileSelect) {
      onFileSelect(file);
    }
  };

  return (
    <div className="space-y-4">
      <label className="block font-medium">Upload Selfie</label>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="w-full"
      />

      {/* Preview Section */}
      {preview && (
        <div className="mt-3">
          <p className="text-sm text-gray-600 mb-1">Preview:</p>
          <img
            src={preview}
            alt="selfie preview"
            className="rounded-xl w-40 h-40 object-cover shadow"
          />
        </div>
      )}
    </div>
  );
}
