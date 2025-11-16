import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0F172A] relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#6366F1]/25 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#EC4899]/25 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-[#6366F1]/10 to-[#EC4899]/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "0.5s" }}
        ></div>
      </div>

      <div className="relative z-10 text-center px-4">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-7xl md:text-8xl font-extrabold bg-gradient-to-r from-[#6366F1] via-[#A5B4FC] to-[#EC4899] bg-clip-text text-transparent mb-4 tracking-tight drop-shadow-2xl animate-pulse">
            SpotMe
          </h1>
          <p className="text-xl md:text-2xl text-[#E2E8F0] font-light tracking-wide">
            Capture moments, find memories
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 mb-12 max-w-3xl mx-auto">
          <div className="bg-gradient-to-r from-[#6366F1]/10 to-[#EC4899]/10 backdrop-blur-md rounded-2xl px-6 py-4 border-2 border-[#A5B4FC]/30 shadow-xl shadow-[#6366F1]/20 transform hover:scale-105 hover:border-[#6366F1]/50 transition-all duration-300">
            <p className="text-[#E2E8F0] font-semibold">
              Smart Photo Recognition
            </p>
          </div>
          <div className="bg-gradient-to-r from-[#6366F1]/10 to-[#EC4899]/10 backdrop-blur-md rounded-2xl px-6 py-4 border-2 border-[#A5B4FC]/30 shadow-xl shadow-[#6366F1]/20 transform hover:scale-105 hover:border-[#6366F1]/50 transition-all duration-300">
            <p className="text-[#E2E8F0] font-semibold">Event Management</p>
          </div>
          <div className="bg-gradient-to-r from-[#6366F1]/10 to-[#EC4899]/10 backdrop-blur-md rounded-2xl px-6 py-4 border-2 border-[#A5B4FC]/30 shadow-xl shadow-[#6366F1]/20 transform hover:scale-105 hover:border-[#6366F1]/50 transition-all duration-300">
            <p className="text-[#E2E8F0] font-semibold">Instant Matching</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/login"
            className="px-8 py-4 bg-transparent border-2 border-[#6366F1] text-[#E2E8F0] font-bold text-lg rounded-full hover:bg-[#6366F1]/10 hover:border-[#A5B4FC] shadow-lg shadow-[#6366F1]/30 transform hover:scale-105 transition-all duration-300 min-w-[200px]"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="px-8 py-4 bg-gradient-to-r from-[#6366F1] to-[#EC4899] text-white font-bold text-lg rounded-full shadow-2xl shadow-[#EC4899]/50 hover:shadow-[#EC4899]/80 transform hover:scale-105 transition-all duration-300 min-w-[200px] border border-[#A5B4FC]/30"
          >
            Get Started
          </Link>
        </div>

        <p className="mt-12 text-[#A5B4FC] text-sm">
          Join thousands of users finding their perfect moments
        </p>
      </div>
    </div>
  );
};

export default HomePage;
