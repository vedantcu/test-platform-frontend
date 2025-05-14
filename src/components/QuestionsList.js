import React, { useEffect, useState } from "react";
import axios from "axios";

const QuestionsList = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ✅ Fetch from your backend
    axios
      .get("http://localhost:5000/api/questions?subject=Physics&topic=Vectors")
      .then((res) => {
        setQuestions(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error fetching questions:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading questions...</p>;

  return (
    <div>
      <h2>Questions:</h2>
      {questions.map((q, index) => (
        <div key={q._id} style={{ border: "1px solid gray", padding: "10px", marginBottom: "10px" }}>
          <p><strong>Q{index + 1}:</strong> {q.question}</p>
          <ul>
            {q.options.map((option, i) => (
              <li key={i}>{option}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default QuestionsList;
