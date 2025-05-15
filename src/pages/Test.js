import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles.css";

const Test = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubject, setSelectedSubject] = useState(null);

    return (
        <div className="test-container">
            <h1 style={{ textAlign: "center" }}>Test Categories</h1>

            {/* ✅ Main Categories: Subject-wise & Topic-wise */}
            {!selectedCategory && (
                <div className="category-container">
                    <button className="category-btn" onClick={() => setSelectedCategory("subject")}>
                        📘 Subject-wise Test
                    </button>
                    <button className="category-btn" onClick={() => setSelectedCategory("topic")}>
                        🔬 Topic-wise Test
                    </button>
                </div>
            )}

            {/* ✅ Subject-wise Test Folders */}
            {selectedCategory === "subject" && (
                <div className="folder-container">
                    <h2>📘 Subject-wise Tests</h2>
                    <Link to="/test/subject/physics" className="folder-btn">⚛ Physics</Link>
                    <Link to="/test/subject/chemistry" className="folder-btn">🧪 Chemistry</Link>
                    <Link to="/test/subject/maths" className="folder-btn">➗ Maths</Link>
                    <Link to="/test/subject/biology" className="folder-btn">🌱 Biology</Link>
                    <button className="back-btn" onClick={() => setSelectedCategory(null)}>🔙 Back</button>
                </div>
            )}

            {/* ✅ Topic-wise Test Folders */}
            {selectedCategory === "topic" && !selectedSubject && (
                <div className="folder-container">
                    <h2>🔬 Topic-wise Tests</h2>
                    <button className="folder-btn" onClick={() => setSelectedSubject("physics")}>⚛ Physics</button>
                    <button className="folder-btn" onClick={() => setSelectedSubject("chemistry")}>🧪 Chemistry</button>
                    <button className="folder-btn" onClick={() => setSelectedSubject("maths")}>➗ Maths</button>
                    <button className="folder-btn" onClick={() => setSelectedSubject("biology")}>🌱 Biology</button>
                    <button className="back-btn" onClick={() => setSelectedCategory(null)}>🔙 Back</button>
                </div>
            )}

            {/* ✅ Physics - Topic-wise Tests */}
            {selectedSubject === "physics" && (
                <div className="folder-container">
                    <h2>⚛ Physics - Topic-wise Tests</h2>
                    <Link to="/test/topic/physics/motion-in-1d" className="folder-btn">📂 Motion in 1D</Link>
                    <Link to="/test/topic/physics/vectors" className="folder-btn">📂 Vectors</Link> {/* ✅ Added this line */}
                    <button className="back-btn" onClick={() => setSelectedSubject(null)}>🔙 Back</button>
                </div>
            )}

            {/* ✅ Chemistry - Topic-wise Tests */}
            {selectedSubject === "chemistry" && (
                <div className="folder-container">
                    <h2>🧪 Chemistry - Topic-wise Tests</h2>
                    <Link to="/test/topic/chemistry/solid-state" className="folder-btn">📂 Solid State</Link>
                    <button className="back-btn" onClick={() => setSelectedSubject(null)}>🔙 Back</button>
                </div>
            )}

            {/* ✅ Maths - Topic-wise Tests */}
            {selectedSubject === "maths" && (
                <div className="folder-container">
                    <h2>➗ Maths - Topic-wise Tests</h2>
                    <Link to="/test/topic/maths/mathematical-logic" className="folder-btn">📂 Mathematical Logic</Link>
                    <Link to="/test/topic/maths/vectors" className="folder-btn">📂 Vectors</Link>
                    <Link to="/test/topic/maths/3d-geometry" className="folder-btn">📂 3D Geometry</Link>
                    <button className="back-btn" onClick={() => setSelectedSubject(null)}>🔙 Back</button>
                </div>
            )}
        </div>
    );
};

export default Test;
