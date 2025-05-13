import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles.css";

const Test = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubject, setSelectedSubject] = useState(null);

    return (
        <div className="test-container">
            <h1 style={{ textAlign: "center" }}>Test Categories</h1>

            {!selectedCategory && (
                <div className="category-container">
                    <button 
                        className="category-btn" 
                        onClick={() => setSelectedCategory("subject")}
                        aria-label="Subject-wise Test"
                    >
                        📘 Subject-wise Test
                    </button>
                    <button 
                        className="category-btn" 
                        onClick={() => setSelectedCategory("topic")}
                        aria-label="Topic-wise Test"
                    >
                        🔬 Topic-wise Test
                    </button>
                </div>
            )}

            {/* ✅ Subject-wise Test Folder */}
            {selectedCategory === "subject" && (
                <div className="folder-container">
                    <h2>📘 Subject-wise Tests</h2>
                    <Link to="/test/subject/physics" className="folder-btn">⚛ Physics</Link>
                    <Link to="/test/subject/chemistry" className="folder-btn">🧪 Chemistry</Link>
                    <Link to="/test/subject/maths" className="folder-btn">➗ Maths</Link>
                    <Link to="/test/subject/biology" className="folder-btn">🌱 Biology</Link>
                    <button 
                        className="back-btn" 
                        onClick={() => setSelectedCategory(null)} 
                        aria-label="Back to Categories"
                    >
                        🔙 Back
                    </button>
                </div>
            )}

            {/* ✅ Topic-wise Test Folder */}
            {selectedCategory === "topic" && !selectedSubject && (
                <div className="folder-container">
                    <h2>🔬 Topic-wise Tests</h2>
                    <button 
                        className="folder-btn" 
                        onClick={() => setSelectedSubject("physics")} 
                        aria-label="Physics Topic-wise Tests"
                    >
                        ⚛ Physics
                    </button>
                    <button 
                        className="folder-btn" 
                        onClick={() => setSelectedSubject("chemistry")} 
                        aria-label="Chemistry Topic-wise Tests"
                    >
                        🧪 Chemistry
                    </button>
                    <button 
                        className="folder-btn" 
                        onClick={() => setSelectedSubject("maths")} 
                        aria-label="Maths Topic-wise Tests"
                    >
                        ➗ Maths
                    </button>
                    <button 
                        className="folder-btn" 
                        onClick={() => setSelectedSubject("biology")} 
                        aria-label="Biology Topic-wise Tests"
                    >
                        🌱 Biology
                    </button>
                    <button 
                        className="back-btn" 
                        onClick={() => setSelectedCategory(null)} 
                        aria-label="Back to Categories"
                    >
                        🔙 Back
                    </button>
                </div>
            )}

            {/* ✅ Maths - Topic-wise Test Folder */}
            {selectedSubject === "maths" && (
                <div className="folder-container">
                    <h2>➗ Maths - Topic-wise Tests</h2>
                    <Link to="/test/topic/maths/mathematical-logic" className="folder-btn">📂 Mathematical Logic</Link>
                    <Link to="/test/topic/maths/vectors" className="folder-btn">📂 Vectors</Link> 
                    <Link to="/test/topic/maths/3d-geometry" className="folder-btn">📂 3D Geometry</Link>
                    <button 
                        className="back-btn" 
                        onClick={() => setSelectedSubject(null)} 
                        aria-label="Back to Topic-wise Tests"
                    >
                        🔙 Back
                    </button>
                </div>
            )}

            {/* ✅ Chemistry - Topic-wise Test Folder */}
            {selectedSubject === "chemistry" && (
                <div className="folder-container">
                    <h2>🧪 Chemistry - Topic-wise Tests</h2>
                    <Link to="/test/topic/chemistry/solid-state" className="folder-btn">📂 Solid State</Link> 
                    <button 
                        className="back-btn" 
                        onClick={() => setSelectedSubject(null)} 
                        aria-label="Back to Topic-wise Tests"
                    >
                        🔙 Back
                    </button>
                </div>
            )}
        </div>
    );
};

export default Test;
