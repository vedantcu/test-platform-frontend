import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth, googleProvider } from "../firebase"; // ✅ Import Firebase Auth
import { signInWithPopup, signOut } from "firebase/auth";
import "../styles.css"; 

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "enabled");
  const [user, setUser] = useState(null);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("darkMode", darkMode ? "enabled" : "disabled");
  }, [darkMode]);

  // ✅ Google Sign-In
  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  // ✅ Sign Out
  const handleSignOut = () => {
    signOut(auth).then(() => setUser(null)).catch((error) => console.error("Sign-Out Error:", error));
  };

  return (
    <nav className={`navbar ${darkMode ? "dark-navbar" : ""}`}>
      <div className="nav-links">
        <Link to="/" className="nav-btn">🏠 Home</Link>
        <Link to="/test" className="nav-btn">📝 Test</Link>
        <Link to="/analytics" className="nav-btn">📊 Analytics</Link>
      </div>

      {/* ✅ Sign-In and Dark Mode Buttons */}
      <div className="auth-container">
        {user ? (
          <div className="user-info">
            <img src={user.photoURL} alt="User" className="user-img" />
            <p>Welcome, {user.displayName}!</p>
            <button onClick={handleSignOut} className="auth-btn">Sign Out</button>
          </div>
        ) : (
          <button onClick={handleSignIn} className="auth-btn">Sign In</button>
        )}

        <button className="dark-mode-toggle" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
