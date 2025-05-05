import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import CricketScorePredictor from "./CricketScorePredictor"; // Fixed this line
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-900 text-white">
        Loading...
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <CricketScorePredictor />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
