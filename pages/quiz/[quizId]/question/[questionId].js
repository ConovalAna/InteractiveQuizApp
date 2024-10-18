import React, { useState } from "react";

export default function Quiz({ question }) {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const handleOptionChange = (event) => {
    const { value, checked } = event.target;

    if (checked) {
      setSelectedOptions([...selectedOptions, value]);
    } else {
      setSelectedOptions(selectedOptions.filter((option) => option !== value));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      selectedOptions.every((selectedOption) =>
        question?.correctAnswer.includes(selectedOption)
      )
    ) {
      alert("Correct! Your answer is correct!!!");
    } else {
      alert("Incorrect. Try again!");
    }

    // Clear the selections (optional)
    setSelectedOptions([]);
  };

  return (
    <div className=" question-container">
      <h2>Question: {question.question}</h2>
      <form className="options-form">
        {question.answers.map((option, index) => (
          <div className="option" key={index}>
            <input
              type="checkbox"
              id={`option-${index}`}
              name="question"
              value={option}
              onChange={handleOptionChange}
            />
            <label htmlFor={`option-${index}`}>{option}</label>
          </div>
        ))}
        <button type="button" className="submit-button" onClick={handleSubmit}>
          Answer
        </button>
      </form>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const request = await fetch(`http://localhost:3000/${params.quizId}.json`);
  const quiz = await request.json();
  const question = quiz?.questions?.find(({ id }) => id == params.questionId);

  return {
    props: { question },
  };
}
