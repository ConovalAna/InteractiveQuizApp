import { useRouter } from "next/router";
import Link from "next/link";

export default function Quiz({ quiz }) {
  const router = useRouter();
  const { quizId } = router.query;
  const questions = quiz.questions;

  return (
    <div class="quiz-container">
      <h1>Please select a question to pass the quiz:</h1>
      <ul>
        {questions.map(({ question, id }, index) => (
          <li key={index}>
            <Link href={`/quiz/${quizId}/question/${id}`}>{question}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const request = await fetch(`http://localhost:3000/${params.quizId}.json`);
  const quiz = await request.json();

  return {
    props: { quiz },
  };
}
