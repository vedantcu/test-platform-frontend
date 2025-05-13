import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles.css";

const SolidStateTest = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [timer, setTimer] = useState(600); // 10 minutes timer
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("https://test-platform-backend-fan9.onrender.com/api/questions?topic=Solid State");
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setError("Failed to load questions. Please try again later.");
      } finally {
        setLoading(false);
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

  const handleOptionChange = (questionId, selectedOption) => {
    if (!submitted) {
      setAnswers((prevAnswers) => ({ ...prevAnswers, [questionId]: selectedOption }));
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div className="test-container">
      <h1 className="test-title">Solid State Test</h1>
      <p className="timer">⏳ Time Left: {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, '0')}</p>
      
      {loading ? (
        <p className="loading-message">Loading questions...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        questions.map((q, index) => (
          <div key={index} className="question-box">
            <p className="question-text"><strong>Q{index + 1}:</strong> {q.questionText}</p>
            <div className="options">
              {q.options.map((option, i) => (
                <label key={i} className={`option-box ${submitted ? (option === q.correctAnswer ? "correct-answer" : option === answers[q._id] ? "wrong-answer" : "") : ""}`}>
                  <input type="radio" name={`question-${q._id}`} value={option} onChange={() => handleOptionChange(q._id, option)} disabled={submitted} />
                  {option}
                </label>
              ))}
            </div>
            {submitted && <p className="solution">✅ Solution: {q.solution}</p>}
          </div>
        ))
      )}

      <button onClick={handleSubmit} className="submit-btn" disabled={submitted || timer === 0}>
        {submitted ? "Test Submitted" : "Submit Test"}
      </button>
    </div>
  );
};

export default SolidStateTest;
