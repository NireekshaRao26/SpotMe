import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-black text-white shadow-md">
      <Link to="/" className="text-2xl font-semibold">SpotMe</Link>

      <div className="flex gap-6 items-center">

        {!token ? (
          <>
            <Link to="/login" className="hover:text-gray-300">Login</Link>
            <Link to="/signup" className="hover:text-gray-300">Signup</Link>
          </>
        ) : (
          <>
            {role === "host" && (
              <Link to="/host/dashboard" className="hover:text-gray-300">
                Dashboard
              </Link>
            )}

            {role === "photographer" && (
              <Link to="/photographer/upload" className="hover:text-gray-300">
                Upload Photos
              </Link>
            )}

            {role === "participant" && (
              <Link to="/search" className="hover:text-gray-300">
                Search Photos
              </Link>
            )}

            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-600 transition"
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
