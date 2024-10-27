import styles from "../../styles/quiz.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import Navbar from "../components/navBar";

export default function Quiz({ quiz }) {
  const router = useRouter();
  const { quizId } = router.query;
  const questions = quiz?.questions;

  return (
    <>
      <Navbar />
      <div className={styles.quizContainer}>
        <h1>These are the question of the quiz:</h1>
        <h2>{quiz.name}</h2>
        <ul>
          {questions.map(({ question, id }, index) => (
            <li key={index}>
              <p>{question}</p>
            </li>
          ))}
        </ul>
        <button>
          <Link href={`/quiz/${quizId}/question/${questions[0].id}`}>
            Start quiz
          </Link>
        </button>
      </div>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const request = await fetch(`http://localhost:3000/${params.quizId}.json`);
  const quiz = await request.json();

  return {
    props: { quiz },
  };
}
