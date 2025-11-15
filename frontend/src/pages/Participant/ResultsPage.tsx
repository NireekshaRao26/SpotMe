import React from "react";

interface Photo {
  id: string;
  url: string;
  name: string;
}

interface ResultsPageProps {
  eventName: string;
  eventCode: string;
  photos: Photo[];
}

const ResultsPage: React.FC<ResultsPageProps> = ({ eventName, eventCode, photos }) => {
  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold mb-2 text-center">{eventName}</h1>
      <p className="text-center text-gray-600 mb-6">Event Code: {eventCode}</p>

      {photos.length === 0 ? (
        <p className="text-center text-gray-500">No photos uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="border rounded shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-200"
            >
              <img
                src={photo.url}
                alt={photo.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-2">
                <p className="text-sm text-gray-700 truncate">{photo.name}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResultsPage;
