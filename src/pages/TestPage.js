import React, { useState, useEffect } from "react";
import axios from "axios";

const Test = () => {
  const [questions, setQuestions] = useState([]);
  const [timer, setTimer] = useState(600); // 10 minutes (600 seconds)
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [error, setError] = useState(""); // Error state for failed fetching

  // Fetch questions from the hosted backend
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("https://test-platform-backend-fan9.onrender.com/api/questions?subject=Maths&topic=Vectors");
        setQuestions(response.data);
      } catch (error) {
        setError("Failed to load questions. Please try again later.");
        console.error("Error fetching questions:", error);
      }
    };
    fetchQuestions();
  }, []);

  // Timer countdown
  useEffect(() => {
    if (timer > 0 && !submitted) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    } else if (timer === 0 && !submitted) {
      handleSubmit(); // Auto-submit when timer reaches 0
    }
  }, [timer, submitted]);

  const handleSubmit = () => {
    if (submitted) return; // Prevent multiple submissions
    
    let calculatedScore = 0;
    questions.forEach((q) => {
      if (answers[q._id] === q.correctAnswer) {
        calculatedScore += 4; // +4 for correct answer
      } else if (answers[q._id]) {
        calculatedScore -= 1; // -1 for incorrect answer
      }
    });
    setScore(calculatedScore >= 0 ? calculatedScore : 0); // Prevent negative scores
    setSubmitted(true);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Vectors Test</h1>
      
      {error && <p style={{ color: "red" }}>{error}</p>}
      
      <p>
        <strong>Time Left:</strong> {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, "0")}
      </p>

      {questions.length === 0 ? (
        <p>Loading questions...</p>
      ) : (
        questions.map((q, index) => (
          <div
            key={q._id}
            style={{
              border: "1px solid black",
              padding: "10px",
              marginBottom: "10px",
              backgroundColor: submitted
                ? answers[q._id] === q.correctAnswer
                  ? "lightgreen"
                  : "lightcoral"
                : "white",
            }}
          >
            <p><strong>Q{index + 1}:</strong> {q.questionText}</p>
            {q.options.map((option, i) => (
              <label key={i} style={{ display: "block", marginBottom: "5px" }}>
                <input
                  type="radio"
                  name={q._id}
                  value={option}
                  onChange={() => setAnswers((prev) => ({ ...prev, [q._id]: option }))} 
                  disabled={submitted}
                />
                {option}
              </label>
            ))}
            {submitted && (
              <p>
                <strong>Correct Answer:</strong> {q.correctAnswer}
                <br />
                <strong>Solution:</strong> {q.solution}
              </p>
            )}
          </div>
        ))
      )}

      {!submitted ? (
        <button 
          onClick={handleSubmit} 
          disabled={submitted || timer === 0} 
          style={{
            padding: "10px 15px", 
            cursor: "pointer", 
            backgroundColor: submitted || timer === 0 ? "#ccc" : "#4CAF50", 
            color: "#fff",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Submit Test
        </button>
      ) : (
        <h2>Final Score: {score}</h2>
      )}
    </div>
  );
};

export default Test;
