import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles.css";
import { BASE_URL } from "../config"; // ✅ Import base URL

const VectorsTest = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [timer, setTimer] = useState(600); // ⏳ 10 minutes
  const [score, setScore] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "enabled");

  // ✅ Fetch questions
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/questions?topic=Vectors`);
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchQuestions();
  }, []);

  // ⏳ Timer countdown
  useEffect(() => {
    if (timer > 0 && !submitted) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer, submitted]);

  // 🌙 Dark mode toggle
  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("darkMode", darkMode ? "enabled" : "disabled");
  }, [darkMode]);

  const handleOptionChange = (questionId, selectedOption) => {
    if (!submitted) {
      setAnswers((prev) => ({ ...prev, [questionId]: selectedOption }));
    }
  };

  // ✅ Submit Test
  const handleSubmit = async () => {
    let correct = 0;
    questions.forEach((q) => {
      if (answers[q._id] === q.correctAnswer) correct += 1;
    });

    const totalQuestions = questions.length;
    const finalScore = (correct / totalQuestions) * 100;
    setScore(finalScore);
    setCorrectCount(correct);
    setSubmitted(true);

    try {
      await axios.post(`${BASE_URL}/api/save-result`, {
        user: "test-user", // replace with actual user if needed
        subject: "Maths",
        topic: "Vectors",
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
      {/* 🌙 Dark Mode Toggle */}
      <button className="dark-mode-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
      </button>

      {/* 🧪 Test Header */}
      <h1 className={`test-title ${darkMode ? "dark-text" : ""}`}>Vectors Test</h1>

      {/* ⏳ Timer */}
      {!submitted && (
        <p className="timer">
          ⏳ Time Left: {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, "0")}
        </p>
      )}

      {/* 🧠 Questions */}
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

      {/* ✅ Submit Button */}
      {!submitted && (
        <button onClick={handleSubmit} className="submit-btn" disabled={timer === 0}>
          Submit Test
        </button>
      )}

      {/* 🎯 Score Display */}
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

export default VectorsTest;
