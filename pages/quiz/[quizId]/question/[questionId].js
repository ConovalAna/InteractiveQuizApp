import style from "../../../../styles/question.module.css";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "../../../components/navBar";

export default function Quiz({ question, nextQuestionId, quizId }) {
  const router = useRouter();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [score, setScore] = useState(0); // Track score state
  const [hasSubmitted, setHasSubmitted] = useState(false); // Prevent double submission
  const [shouldRedirect, setShouldRedirect] = useState(false);

  // Handle option selection
  const handleOptionChange = (event) => {
    const { value, checked } = event.target;
    setSelectedOptions((prevOptions) =>
      checked
        ? [...prevOptions, value]
        : prevOptions.filter((opt) => opt !== value)
    );
  };

  useEffect(() => {
    if (shouldRedirect) {
      router.push({
        pathname: `/quiz/${quizId}/result`,
        query: { score: score },
      });
    }
  }, [score, shouldRedirect, quizId, router]);

  // Check the answer and update score
  const handleSubmit = (event) => {
    event.preventDefault();

    if (hasSubmitted) return; // Prevent multiple submissions
    setHasSubmitted(true); // Disable submission after first click

    const isCorrect =
      selectedOptions.every((option) =>
        question.correctAnswer.includes(option)
      ) && selectedOptions.length === question.correctAnswer.length;

    if (isCorrect) {
      alert("Correct! Your answer is correct!!!");
      setScore((prevScore) => prevScore + 1); // Update score
    } else {
      alert("Incorrect answer!");
    }

    setSelectedOptions([]); // Reset selected options

    if (nextQuestionId !== null) {
      redirectNextQuestion();
    } else {
      setShouldRedirect(true); // Trigger redirect after score is updated
    }
  };

  // Redirect to the next question
  const redirectNextQuestion = () => {
    setHasSubmitted(false); // Allow new submissions for the next question
    router.push(`/quiz/${quizId}/question/${nextQuestionId}`);
  };

  return (
    <>
      <Navbar />
      <div className={style.questionContainer}>
        <h2>Question: {question.question}</h2>
        <form className={style.optionsForm} onSubmit={handleSubmit}>
          {question.answers.map((option, index) => (
            <div className={style.option} key={index}>
              <input
                type="checkbox"
                id={`option-${index}`}
                name="question"
                value={option}
                onChange={handleOptionChange}
                checked={selectedOptions.includes(option)}
                disabled={hasSubmitted} // Disable interaction after submission
              />
              <label htmlFor={`option-${index}`}>{option}</label>
            </div>
          ))}
          <button
            type="submit"
            className={style.submitButton}
            disabled={hasSubmitted} // Prevent multiple submissions
          >
            Answer
          </button>
        </form>
      </div>
    </>
  );
}

export async function getServerSideProps({ params }) {
  try {
    const request = await fetch(`http://localhost:3000/${params.quizId}.json`);
    const quiz = await request.json();
    const question = quiz.questions.find(({ id }) => id == params.questionId);

    // Calculate next question ID
    const currentQuestionIndex = quiz.questions.indexOf(question);
    const nextQuestionIndex = currentQuestionIndex + 1;
    let nextQuestionId = null;

    if (nextQuestionIndex < quiz.questions.length) {
      nextQuestionId = quiz.questions[nextQuestionIndex].id;
    }

    return {
      props: {
        question,
        nextQuestionId,
        quizId: params.quizId,
      },
    };
  } catch (error) {
    console.error("Error fetching quiz data:", error);
    return {
      notFound: true,
    };
  }
}
