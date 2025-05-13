import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles.css";
import { BASE_URL } from "../config"; // ✅ Import base URL

const ThreeDGeometryTest = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "enabled");
  const [timer, setTimer] = useState(600);
  const [score, setScore] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/questions?topic=3D%20Geometry`);
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchQuestions();
  }, []);

  useEffect(() => {
    if (timer > 0 && !submitted) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer, submitted]);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("darkMode", darkMode ? "enabled" : "disabled");
  }, [darkMode]);

  const handleOptionChange = (questionId, selectedOption) => {
    if (!submitted) {
      setAnswers((prevAnswers) => ({ ...prevAnswers, [questionId]: selectedOption }));
    }
  };

  const handleSubmit = async () => {
    let correct = 0;

    questions.forEach((q) => {
      if (answers[q._id] === q.correctAnswer) {
        correct += 1;
      }
    });

    const totalQuestions = questions.length;
    const finalScore = (correct / totalQuestions) * 100;

    setScore(finalScore);
    setCorrectCount(correct);
    setSubmitted(true);

    try {
      await axios.post(`${BASE_URL}/api/save-result`, {
        user: "test-user",
        subject: "Maths",
        topic: "3D Geometry",
        score: finalScore,
        totalQuestions,
        correctAnswers: correct,
      });
    } catch (error) {
      console.error("Error saving test result:", error);
    }
  };

  return (
    <div className={`test-container ${darkMode ? "dark" : ""}`}>
      <button className="dark-mode-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
      </button>

      <h1 className={`test-title ${darkMode ? "dark-text" : ""}`}>3D Geometry Test</h1>

      {!submitted && (
        <p className="timer">
          ⏳ Time Left: {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, "0")}
        </p>
      )}

      {questions.length > 0 ? (
        questions.map((q, index) => (
          <div key={index} className="question-box">
            <p className="question-text">
              <strong>Q{index + 1}:</strong> {q.questionText}
            </p>
            <div className="options">
              {q.options.map((option, i) => (
                <div
                  key={i}
                  className={`option-box ${
                    submitted
                      ? option === q.correctAnswer
                        ? "correct-answer"
                        : option === answers[q._id]
                        ? "wrong-answer"
                        : ""
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    id={`q${index}-option${i}`}
                    name={`question-${q._id}`}
                    value={option}
                    onChange={() => handleOptionChange(q._id, option)}
                    disabled={submitted}
                  />
                  <label htmlFor={`q${index}-option${i}`}>{option}</label>
                </div>
              ))}
            </div>
            {submitted && <p className="solution">✅ Solution: {q.solution}</p>}
          </div>
        ))
      ) : (
        <p className="loading-message">Loading questions...</p>
      )}

      {!submitted && (
        <button onClick={handleSubmit} className="submit-btn" disabled={timer === 0}>
          Submit Test
        </button>
      )}

      {submitted && (
        <div className="score-box">
          <h2>🎯 Test Completed!</h2>
          <p>
            ✅ Correct Answers: <strong>{correctCount}</strong>
          </p>
          <p>
            ❌ Wrong Answers: <strong>{questions.length - correctCount}</strong>
          </p>
          <h3>Your Score: <span>{score.toFixed(2)}%</span></h3>
        </div>
      )}
    </div>
  );
};

export default ThreeDGeometryTest;
