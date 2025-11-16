import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const token: string | null = localStorage.getItem("token");
  const role: string | null = localStorage.getItem("role");

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-[#0F172A] border-b-2 border-[#A5B4FC]/20 text-[#E2E8F0] shadow-lg shadow-[#6366F1]/10">
      <Link
        to="/"
        className="text-2xl font-bold bg-gradient-to-r from-[#6366F1] to-[#EC4899] bg-clip-text text-transparent hover:scale-105 transition-transform duration-300"
      >
        SpotMe
      </Link>

      <div className="flex gap-6 items-center">
        {!token ? (
          <>
            <Link
              to="/login"
              className="text-[#A5B4FC] hover:text-[#E2E8F0] font-semibold transition-colors duration-300"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-6 py-2 bg-gradient-to-r from-[#6366F1] to-[#EC4899] text-white font-bold rounded-xl shadow-lg shadow-[#EC4899]/30 hover:shadow-[#EC4899]/50 transition-all duration-300"
            >
              Signup
            </Link>
          </>
        ) : (
          <>
            {role === "host" && (
              <Link
                to="/host/dashboard"
                className="text-[#A5B4FC] hover:text-[#E2E8F0] font-semibold transition-colors duration-300"
              >
                Dashboard
              </Link>
            )}

            {role === "photographer" && (
              <Link
                to="/photographer/upload"
                className="text-[#A5B4FC] hover:text-[#E2E8F0] font-semibold transition-colors duration-300"
              >
                Upload Photos
              </Link>
            )}

            {role === "participant" && (
              <Link
                to="/search"
                className="text-[#A5B4FC] hover:text-[#E2E8F0] font-semibold transition-colors duration-300"
              >
                Search Photos
              </Link>
            )}

            <button
              onClick={handleLogout}
              className="bg-gradient-to-r from-red-500 to-red-600 px-6 py-2 rounded-xl font-bold hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
