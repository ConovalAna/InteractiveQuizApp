import styles from "../../styles/quiz.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import Navbar from "../components/navBar";
import { useEffect, useState } from "react";
import { useQuizContext } from "@/contexts/quiz/quizContext";
import AddQuestionForm from "../components/AddQuestionForm";

export default function Quiz() {
  const router = useRouter();
  const [quiz, setQuiz] = useState({});
  const [showAddForm, setShowAddForm] = useState(false);
  const { setSharedQuiz } = useQuizContext();

  const addQuestion = async (newQuestion) => {
    await fetch(`http://localhost:3000/api/quiz/${router.query.quizId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newQuestion),
    });

    await loadQuiz(router.query.quizId);
  };

  useEffect(() => {
    if (router.query.quizId) {
      loadQuiz(router.query.quizId);
    }
  }, [router.query.quizId]);

  return (
    <>
      <Navbar />
      <div className={styles.quizContainer}>
        <h1>These are the question of the quiz:</h1>
        <h2>{quiz.name}</h2>
        <ul>
          {quiz?.questions?.map(({ question, id }) => (
            <li key={id}>
              <p>{question}</p>
            </li>
          ))}
        </ul>
        <div className={styles.buttonGrupFlex}>
          <button>
            <Link
              href={`/quiz/${router.query.quizId}/question/${quiz?.questions?.[0].id}`}
            >
              Start quiz
            </Link>
          </button>

          <button onClick={() => setShowAddForm(!showAddForm)}>
            {showAddForm ? "Hide the form" : "Add question"}
          </button>
        </div>

        {showAddForm && <AddQuestionForm onAddQuestion={addQuestion} />}
      </div>
    </>
  );

  async function loadQuiz(quizId) {
    const request = await fetch(`http://localhost:3000/api/quiz/${quizId}`);
    const quiz = await request.json();

    setQuiz(quiz);
    setSharedQuiz({ quiz });
  }
}
