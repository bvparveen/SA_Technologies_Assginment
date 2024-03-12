import React, { useState } from "react";
import { QUESTIONS } from "./questions";

function App() {
  const [score, setScore] = useState(0);
  const [runCount, setRunCount] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});

  const handleOptionChange = (event, key) => {
    setSelectedOptions({
      ...selectedOptions,
      [key]: event.target.value
    });
  };

  const handleAnswer = () => {
    let newScore = 0;
    let answeredQuestions = 0;
    for (const key in selectedOptions) {
      if (selectedOptions[key] === "yes") {
        newScore++;
      }
      if (selectedOptions[key]) {
        answeredQuestions++;
      }
    }
    if (answeredQuestions === Object.keys(QUESTIONS).length) {
      const calculatedScore = (100 * newScore) / Object.keys(QUESTIONS).length;
      setScore(calculatedScore);
      setRunCount(runCount + 1);
    } else {
      alert("Please answer all questions before submitting.");
    }
  };

  const resetGame = () => {
    setScore(0);
    setRunCount(0);
    setSelectedOptions({});
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div>
          <h2>Question</h2>
          <div>
            {Object.entries(QUESTIONS).map(([key, value]) => {
              return (
                <div key={key}>
                  <p>{value}</p>
                  <input
                    type="radio"
                    id={"yes" + key}
                    name={"que" + key}
                    value="yes"
                    onChange={(event) => handleOptionChange(event, key)}
                  />
                  <label htmlFor={"yes" + key}>Yes</label>
                  <br />
                  <input
                    type="radio"
                    id={"no" + key}
                    name={"que" + key}
                    value="no"
                    onChange={(event) => handleOptionChange(event, key)}
                  />
                  <label htmlFor={"no" + key}>No</label>
                  <br />
                </div>
              );
            })}
          </div>
          <button onClick={handleAnswer}>Submit Answer</button>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <p>Your overall score: {score}</p>
      </div>
    </>
  );
}

export default App;
