import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../api/endpoints";
import { setAuthToken } from "../../api/axios";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F172A] px-4 py-12 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-64 h-64 bg-[#6366F1]/25 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 left-20 w-80 h-80 bg-[#EC4899]/25 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1.5s" }}
        ></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-[#6366F1]/10 to-[#EC4899]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <h1 className="text-5xl font-extrabold bg-gradient-to-r from-[#6366F1] via-[#A5B4FC] to-[#EC4899] bg-clip-text text-transparent mb-2 tracking-tight drop-shadow-lg hover:scale-105 transition-transform duration-300">
              SpotMe
            </h1>
          </Link>
          <p className="text-[#E2E8F0] text-lg">Welcome back!</p>
        </div>

        <div className="bg-gradient-to-br from-[#6366F1]/10 to-[#EC4899]/10 backdrop-blur-2xl p-8 rounded-3xl shadow-2xl border-2 border-[#A5B4FC]/40 shadow-[#6366F1]/20">
          <h2 className="text-3xl font-bold mb-2 text-[#E2E8F0] text-center">
            Login
          </h2>
          <p className="text-[#A5B4FC] text-center mb-8">
            Sign in to continue to your account
          </p>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg animate-shake">
                <p className="text-red-700 text-sm font-medium">{error}</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-[#A5B4FC] mb-2 uppercase tracking-wide">
                Username
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-[#0F172A]/80 border-2 border-[#A5B4FC]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-300 text-[#E2E8F0] placeholder-[#A5B4FC]/50"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-[#A5B4FC] mb-2 uppercase tracking-wide">
                Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 bg-[#0F172A]/80 border-2 border-[#A5B4FC]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-300 text-[#E2E8F0] placeholder-[#A5B4FC]/50"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-gradient-to-r from-[#6366F1] to-[#EC4899] text-white font-bold rounded-xl shadow-2xl shadow-[#EC4899]/50 hover:shadow-[#EC4899]/80 transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none border border-[#A5B4FC]/30"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-3"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Logging in...
                </span>
              ) : (
                "Login"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-slate-400">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-indigo-400 font-semibold hover:text-pink-400 transition-colors duration-300"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link
            to="/"
            className="text-slate-400 hover:text-slate-300 font-medium inline-flex items-center gap-2 transition-colors duration-300"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
