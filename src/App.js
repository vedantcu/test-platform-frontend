import "./styles.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

// ✅ Pages
import Home from "./pages/Home";
import Test from "./pages/Test";
import TestPage from "./pages/TestPage";
import Analytics from "./pages/Analytics";

import ThreeDGeometryTest from "./pages/ThreeDGeometryTest";

// ✅ Components
import Navbar from "./components/Navbar";
import MotionIn1DTest from "./components/test/topic wise test/physics/MotionIn1DTest";
import VectorsTest from "./components/test/topic wise test/physics/VectorsTest";

// ✅ Firebase Auth
import { auth, googleProvider } from "./firebase";
import { signInWithPopup, signOut } from "firebase/auth";

function App() {
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "enabled");
  const [user, setUser] = useState(null);

  // ✅ Apply dark mode toggle
  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("darkMode", darkMode ? "enabled" : "disabled");
  }, [darkMode]);

  // ✅ Google Sign-In Handler
  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  // ✅ Sign-Out Handler
  const handleSignOut = () => {
    signOut(auth)
      .then(() => setUser(null))
      .catch((error) => console.error("Sign-Out Error:", error));
  };

  return (
    <Router>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <div className="auth-container">
        {user ? (
          <div className="user-info">
            <img src={user.photoURL} alt="User" className="user-img" />
            <p>Welcome, {user.displayName}!</p>
            <button onClick={handleSignOut} className="auth-btn">Sign Out</button>
          </div>
        ) : (
          <button onClick={handleSignIn} className="auth-btn">Sign In with Google</button>
        )}
      </div>

      <Routes>
        {/* ✅ Main Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<Test />} />
        <Route path="/test/subject/:category" element={<TestPage />} />
        <Route path="/analytics" element={<Analytics />} />

        {/* ✅ Topic-wise Test Routes */}
        <Route path="/test/topic/:category" element={<TestPage />} />
        <Route path="/test/topic/maths/3d-geometry" element={<ThreeDGeometryTest />} />
        <Route path="/test/topic/physics/motion-in-1d" element={<MotionIn1DTest />} />
        <Route path="/test/topic/physics/vectors" element={<VectorsTest />} />
      </Routes>
    </Router>
  );
}

export default App;