import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../api/endpoints";

type Role = "participant" | "photographer" | "host";

const Signup: React.FC = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("participant");
  const [error, setError] = useState("");

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await registerUser({ username, password, role });
      navigate("/");
    } catch (err: any) {
      const detail = err.response?.data?.detail;

      if (Array.isArray(detail)) {
        setError(detail[0].msg);
      } else {
        setError(detail || "Signup failed");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Create an account
        </h2>

        <form onSubmit={handleSignup}>
          {error && (
            <p className="text-sm text-red-600 mb-3 text-center">{error}</p>
          )}

          <label className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            className="input"
            placeholder="choose a username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label className="block text-sm font-medium text-gray-700 mt-4">
            Password
          </label>
          <input
            type="password"
            className="input"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label className="block text-sm font-medium text-gray-700 mt-4">
            Role
          </label>
          <select
            className="input"
            value={role}
            onChange={(e) => setRole(e.target.value as Role)}
          >
            <option value="participant">Participant</option>
            <option value="photographer">Photographer</option>
            <option value="host">Host</option>
          </select>

          <button type="submit" className="btn-primary mt-6 w-full">
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
