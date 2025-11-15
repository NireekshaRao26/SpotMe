import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

type Role = "participant" | "photographer" | "host";

const Signup: React.FC = () => {
  const navigate = useNavigate();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<Role>("participant");
  const [error, setError] = useState<string>("");

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await api.post("/auth/signup", { name, email, password, role });
      navigate("/login"); // Redirect to login after successful signup
    } catch (err: any) {
      setError(err.response?.data?.detail || "Signup failed");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto mt-10 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Signup</h2>

      <form onSubmit={handleSignup}>
        {error && <p className="text-red-500 mb-2">{error}</p>}

        <input
          type="text"
          className="input"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          className="input mt-3"
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

        <button className="btn-primary mt-4 w-full">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
