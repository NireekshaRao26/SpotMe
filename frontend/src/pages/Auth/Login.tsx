import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

type Role = "participant" | "photographer" | "host";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<Role>("participant");
  const [error, setError] = useState<string>("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", { email, password, role });

      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("role", role);

      if (role === "host") navigate("/host/dashboard");
      else if (role === "photographer") navigate("/photographer/upload");
      else navigate("/participant/search");

    } catch (err: any) {
      setError(err.response?.data?.detail || "Login failed");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto mt-10 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Login</h2>

      <form onSubmit={handleLogin}>
        {error && <p className="text-red-500 mb-2">{error}</p>}

        <input
          type="email"
          className="input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="input mt-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <select
          className="input mt-3"
          value={role}
          onChange={(e) => setRole(e.target.value as Role)}
        >
          <option value="participant">Participant</option>
          <option value="photographer">Photographer</option>
          <option value="host">Host</option>
        </select>

        <button className="btn-primary mt-4 w-full">Login</button>
      </form>
    </div>
  );
};

export default Login;
