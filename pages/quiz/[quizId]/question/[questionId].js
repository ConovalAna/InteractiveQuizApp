import style from "../../../../styles/question.module.css";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter } from "next/router";
import Navbar from "../../../components/navBar";
import { useQuizContext } from "@/contexts/quiz/quizContext";

export default function Quiz() {
  const router = useRouter();
  const { sharedQuiz } = useQuizContext();

  const [quizData, setQuizData] = useState({
    quiz: null,
    question: null,
    nextQuestionId: null,
  });
  const [selectedOption, setSelectedOption] = useState();
  const [score, setScore] = useState(0);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const quizId = useMemo(() => router.query.quizId, [router.query.quizId]);

  const handleOptionChange = useCallback((event) => {
    const { value, checked } = event.target;
    setSelectedOption(() => (checked ? [value] : null));
  }, []);

  const loadQuiz = useCallback(
    async (quiz = null) => {
      try {
        const questionId = router.query.questionId;

        if (!quiz) {
          const request = await fetch(`http://localhost:3000/${quizId}.json`);
          quiz = await request.json();
        }

        const question = quiz?.questions?.find(({ id }) => id == questionId);
        const nextQuestionId = getNextQuestionId(quiz, question);

        setQuizData({ quiz, question, nextQuestionId });
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    },
    [router.query.questionId, quizId]
  );

  const getNextQuestionId = useCallback((quiz, question) => {
    const currentQuestionIndex = quiz.questions.indexOf(question);
    const nextQuestionIndex = currentQuestionIndex + 1;

    return nextQuestionIndex < quiz.questions.length
      ? quiz.questions[nextQuestionIndex].id
      : null;
  }, []);

  useEffect(() => {
    const { newQuiz } = sharedQuiz;
    loadQuiz(newQuiz);
  }, [router, sharedQuiz, loadQuiz]);

  useEffect(() => {
    if (shouldRedirect) {
      router.push({
        pathname: `/quiz/${quizId}/result`,
        query: { score },
      });
    }
  }, [shouldRedirect, score, router, quizId]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const { question } = quizData;

    if (hasSubmitted) return;

    setHasSubmitted(true);

    const isCorrect =
      selectedOption == question.answers[question.correctAnswer];

    if (isCorrect) {
      alert("Correct! Your answer is correct!!!");
      setScore((prevScore) => prevScore + 1);
    } else {
      alert("Incorrect answer!");
    }

    setSelectedOption(null);

    if (quizData.nextQuestionId !== null) {
      redirectNextQuestion();
    } else {
      setShouldRedirect(true);
    }
  };

  const redirectNextQuestion = () => {
    setHasSubmitted(false);
    router.push(`/quiz/${quizId}/question/${quizData.nextQuestionId}`);
  };

  return (
    <>
      <Navbar />
      <div className={style.questionContainer}>
        <h2>Question: {quizData.question?.question}</h2>
        <form className={style.optionsForm} onSubmit={handleSubmit}>
          {quizData.question?.answers?.map((option, index) => (
            <div className={style.option} key={index}>
              <input
                type="checkbox"
                id={`option-${index}`}
                name="question"
                value={option}
                onChange={handleOptionChange}
                checked={option == selectedOption}
                disabled={hasSubmitted}
                aria-label={`Option ${index + 1}`}
              />
              <label htmlFor={`option-${index}`}>{option}</label>
            </div>
          ))}
          <button
            type="submit"
            className={style.submitButton}
            disabled={hasSubmitted}
          >
            Answer
          </button>
        </form>
      </div>
    </>
  );
}
