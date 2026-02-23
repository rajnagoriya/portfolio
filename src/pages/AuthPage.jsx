import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import toast from "react-hot-toast";

export default function AuthPage() {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(location.state?.from?.pathname || "/admin", { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || "/admin";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = login(username.trim(), password);

    setLoading(false);

    if (result.success) {
      toast.success("Login successful");
      navigate(from, { replace: true });
    } else {
      setError(result.error || "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="bg-zinc-900 border border-zinc-700 rounded-2xl p-8 shadow-xl"
        >
          <h1 className="text-2xl font-bold text-white font-[anzo3] mb-6 text-center">
            Admin Login
          </h1>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm text-zinc-400 mb-1">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-600 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent"
                placeholder="Enter username"
                required
                autoComplete="username"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm text-zinc-400 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-600 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent"
                placeholder="Enter password"
                required
                autoComplete="current-password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full py-2.5 rounded-lg bg-white text-black font-semibold hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
