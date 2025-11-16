import React from "react";

const Loading: React.FC<{ message?: string }> = ({
  message = "Loading...",
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-full py-10 gap-4">
      <svg
        className="animate-spin h-12 w-12 text-[#6366F1]"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>

      <div className="text-2xl md:text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#6366F1] to-[#EC4899]">
        SpotMe
      </div>

      <div className="flex items-center gap-2 text-sm text-[#A5B4FC]">
        <span>{message}</span>
        <span className="inline-block w-2 h-2 rounded-full bg-[#A5B4FC] animate-pulse" />
      </div>
    </div>
  );
};

export default Loading;
