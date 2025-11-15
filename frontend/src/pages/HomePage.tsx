import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Welcome to SpotMe 🎉</h1>

      <div className="flex gap-4">
        <Link to="/login" className="btn-primary">
          Login
        </Link>

        <Link to="/signup" className="btn-primary">
          Signup
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
