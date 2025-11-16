import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../api/endpoints";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const isHost = role === "host";

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (err) {
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      navigate("/login");
    }
  };

  return (
    <nav
      className={`flex justify-between items-center w-full px-6 ${
        isHost ? "py-6" : "py-4"
      } bg-[#0F172A] border-b-2 border-[#A5B4FC]/20 text-[#E2E8F0] shadow-lg shadow-[#6366F1]/10`}
    >
      <div className="max-w-6xl w-full mx-auto flex items-center justify-between">
        <Link
          to="/"
          className={`font-extrabold bg-gradient-to-r from-[#6366F1] to-[#EC4899] bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 ${
            isHost ? "text-4xl md:text-5xl" : "text-3xl md:text-4xl"
          }`}
        >
          SpotMe
        </Link>

        <div>
          <button
            onClick={handleLogout}
            className="bg-gradient-to-r from-[#6366F1] to-[#EC4899] px-4 py-2 rounded-xl font-bold text-white hover:from-[#4f46e5] hover:to-[#f472b6] transition-all duration-300 shadow-lg"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
