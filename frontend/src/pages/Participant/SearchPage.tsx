import React, { useState } from "react";

interface Photo {
  id: string;
  name: string;
  url: string;
}

interface SearchPageProps {
  photos: Photo[];
}

const SearchPage: React.FC<SearchPageProps> = ({ photos }) => {
  const [query, setQuery] = useState("");

  const filteredPhotos = photos.filter((photo) =>
    photo.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Search Photos</h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by photo name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {filteredPhotos.length === 0 ? (
        <p className="text-center text-gray-500">No results found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredPhotos.map((photo) => (
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

export default SearchPage;
