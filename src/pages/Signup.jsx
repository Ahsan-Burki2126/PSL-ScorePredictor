import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 flex items-center justify-center">
      {/* Glassmorphism Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/4 right-0 w-72 h-72 bg-purple-500 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-80 h-80 bg-indigo-500 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main Content Container */}
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden border border-white/20 relative z-10">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600/80 to-indigo-600/80 p-6 relative border-b border-white/20">
          <h1 className="text-2xl font-bold text-white text-center font-sans tracking-wide">
            <span className="text-amber-300">PSL</span> Score Predictor - Sign
            Up
          </h1>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
        </div>

        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-400/20 backdrop-blur-sm text-red-100 rounded-xl border border-red-400/30">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-white/20 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-amber-400 bg-white/10 backdrop-blur-sm text-white placeholder-white/50"
                required
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 border border-white/20 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-amber-400 bg-white/10 backdrop-blur-sm text-white placeholder-white/50 pr-10"
                  required
                  placeholder="Create password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-white/70 hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-1">
                Confirm Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 border border-white/20 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-amber-400 bg-white/10 backdrop-blur-sm text-white placeholder-white/50"
                required
                placeholder="Confirm password"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-opacity-50 backdrop-blur-sm border border-white/20 hover:border-white/30"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-4 text-center text-white/80">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-amber-300 hover:text-amber-400 font-medium transition-colors"
            >
              Log In
            </Link>
          </p>
        </div>

        {/* Footer */}
        <div className="bg-blue-800/30 p-3 relative border-t border-white/20">
          <div className="flex justify-center">
            <div className="w-4/5 h-1 bg-white/30 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
