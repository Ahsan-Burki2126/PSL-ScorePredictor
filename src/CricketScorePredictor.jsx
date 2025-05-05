import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";

const CricketScorePredictor = () => {
  const [formData, setFormData] = useState({
    batting_team: "Multan Sultans",
    bowling_team: "Islamabad United",
    city: "Abu Dhabi",
    current_score: 0,
    overs_done: 0,
    wickets_out: 0,
    runs_last_5: 0,
    is_powerplay: false,
  });
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const teams = [
    "Multan Sultans",
    "Islamabad United",
    "Lahore Qalandars",
    "Peshawar Zalmi",
    "Quetta Gladiators",
    "Karachi Kings",
  ];

  const cities = [
    "Lahore",
    "Karachi",
    "Rawalpindi",
    "Multan",
    "Abu Dhabi",
    "Dubai",
    "Sharjah",
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const predictScore = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          batting_team: formData.batting_team,
          bowling_team: formData.bowling_team,
          city: formData.city,
          current_score: Number(formData.current_score),
          overs_done: Number(formData.overs_done),
          wickets_out: Number(formData.wickets_out),
          runs_last_5: Number(formData.runs_last_5),
          is_powerplay: formData.is_powerplay,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Prediction failed");
      }

      const data = await response.json();
      setPrediction(data.prediction);
    } catch (error) {
      console.error("Prediction error:", error);
      setError(error.message || "Failed to connect to server");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-blue-900 to-indigo-900">
      <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl overflow-hidden border border-white/20">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 relative">
          <button
            onClick={() => signOut(auth).then(() => navigate("/login"))}
            className="absolute top-4 right-4 text-white/90 hover:text-white text-sm font-medium bg-white/10 hover:bg-white/20 px-3 py-1 rounded-lg transition-all"
          >
            Logout
          </button>
          <h1 className="text-2xl md:text-3xl font-bold text-white text-center">
            <span className="text-amber-300">PSL</span> Score Predictor
          </h1>
          {prediction && (
            <div className="mt-4 text-center text-white">
              <p className="text-lg">Predicted Final Score:</p>
              <p className="text-3xl font-bold text-amber-300">
                {prediction.toFixed(1)} runs
              </p>
            </div>
          )}
        </div>

        {/* Form */}
        <div className="p-6 space-y-6">
          {/* Team Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Batting Team
              </label>
              <select
                name="batting_team"
                value={formData.batting_team}
                onChange={handleChange}
                className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-amber-400"
              >
                {teams.map((team) => (
                  <option key={team} value={team}>
                    {team}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Bowling Team
              </label>
              <select
                name="bowling_team"
                value={formData.bowling_team}
                onChange={handleChange}
                className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-amber-400"
              >
                {teams.map((team) => (
                  <option key={team} value={team}>
                    {team}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Match Details */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Venue
            </label>
            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-amber-400"
            >
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Stats Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: "current_score", label: "Current Score", min: 0 },
              {
                name: "overs_done",
                label: "Overs Completed",
                min: 0,
                max: 20,
                step: 0.1,
              },
              { name: "wickets_out", label: "Wickets Lost", min: 0, max: 10 },
              { name: "runs_last_5", label: "Runs (Last 5 Overs)", min: 0 },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  {field.label}
                </label>
                <input
                  type="number"
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  min={field.min}
                  max={field.max}
                  step={field.step || 1}
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white"
                />
              </div>
            ))}
          </div>

          {/* Powerplay Toggle */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="powerplay"
              name="is_powerplay"
              checked={formData.is_powerplay}
              onChange={handleChange}
              className="h-5 w-5 text-amber-500 rounded focus:ring-amber-400"
            />
            <label htmlFor="powerplay" className="ml-2 text-sm text-white/80">
              Powerplay Active (First 6 Overs)
            </label>
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-red-400 text-sm p-2 bg-red-900/20 rounded">
              Error: {error}
            </div>
          )}

          {/* Predict Button */}
          <button
            onClick={predictScore}
            disabled={isLoading}
            className={`w-full py-3 px-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold rounded-lg mt-6
              ${
                isLoading
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:from-amber-600 hover:to-amber-700"
              }`}
          >
            {isLoading ? "Predicting..." : "Predict Score"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CricketScorePredictor;
