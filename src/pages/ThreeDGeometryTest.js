import React, { useState, useEffect } from "react";
import axios from "axios";

const ThreeDGeometryTest = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [timer, setTimer] = useState(600); // 10 minutes
  const [score, setScore] = useState(0);

  // ✅ Fetch 3D Geometry Questions
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/questions?topic=3D%20Geometry");
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchQuestions();
  }, []);

  // ✅ Timer countdown and auto-submit
  useEffect(() => {
    if (timer > 0 && !submitted) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    } else if (timer === 0 && !submitted) {
      handleSubmit();
    }
  }, [timer, submitted]);

  // ✅ Handle submission
  const handleSubmit = () => {
    let calculatedScore = 0;
    questions.forEach((q) => {
      if (answers[q._id] === q.correctAnswer) {
        calculatedScore += 4;
      } else if (answers[q._id]) {
        calculatedScore -= 1;
      }
    });

    setScore(calculatedScore >= 0 ? calculatedScore : 0);
    setSubmitted(true);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>3D Geometry Test</h1>

      {!submitted && (
        <p>
          ⏳ <strong>Time Left:</strong> {Math.floor(timer / 60)}:
          {String(timer % 60).padStart(2, "0")}
        </p>
      )}

      {questions.length > 0 ? (
        questions.map((q, index) => {
          const isCorrect = answers[q._id] === q.correctAnswer;
          const isSelected = answers[q._id];

          return (
            <div
              key={q._id}
              style={{
                backgroundColor: submitted
                  ? isCorrect
                    ? "lightgreen"
                    : isSelected
                    ? "lightcoral"
                    : "#f8f8f8"
                  : "#fff",
                padding: "10px",
                margin: "10px 0",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            >
              <p>
                <strong>Q{index + 1}:</strong> {q.questionText}
              </p>
              {q.options.map((option, i) => (
                <label key={i} style={{ display: "block", marginBottom: "5px" }}>
                  <input
                    type="radio"
                    name={q._id}
                    value={option}
                    onChange={() =>
                      setAnswers((prev) => ({ ...prev, [q._id]: option }))
                    }
                    disabled={submitted}
                    checked={answers[q._id] === option}
                  />{" "}
                  {option}
                </label>
              ))}
              {submitted && (
                <p style={{ marginTop: "8px" }}>
                  ✅ <strong>Correct Answer:</strong> {q.correctAnswer}
                  <br />
                  📘 <strong>Solution:</strong> {q.solution}
                </p>
              )}
            </div>
          );
        })
      ) : (
        <p>Loading questions...</p>
      )}

      {!submitted ? (
        <button
          onClick={handleSubmit}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            marginTop: "20px",
            cursor: "pointer",
          }}
        >
          Submit Test
        </button>
      ) : (
        <div style={{ marginTop: "20px" }}>
          <h2>🎯 Test Completed!</h2>
          <p>
            ✅ <strong>Score:</strong> {score} / {questions.length * 4}
          </p>
          <p>
            📊 <strong>Correct:</strong>{" "}
            {questions.filter((q) => answers[q._id] === q.correctAnswer).length}
          </p>
          <p>
            ❌ <strong>Wrong:</strong>{" "}
            {questions.filter(
              (q) => answers[q._id] && answers[q._id] !== q.correctAnswer
            ).length}
          </p>
        </div>
      )}
    </div>
  );
};

export default ThreeDGeometryTest;
