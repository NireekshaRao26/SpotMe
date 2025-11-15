import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api/endpoints";
import { setAuthToken } from "../../api/axios";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: any) => {
    e.preventDefault();

    try {
      const res = await loginUser({ username, password });

      const token = res.data.access_token;
      const role = res.data.role; // backend should send this

      setAuthToken(token);
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      if (role === "host") navigate("/host");
      else if (role === "photographer") navigate("/photographer");
      else navigate("/participant");
    } catch (err: any) {
      setError(err.response?.data?.detail || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <form onSubmit={handleLogin}>
          {error && <p className="text-red-500 text-center mb-3">{error}</p>}

          <label className="block text-sm font-medium">Username</label>
          <input
            className="input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label className="block text-sm font-medium mt-4">Password</label>
          <input
            type="password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="btn-primary w-full mt-6">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
