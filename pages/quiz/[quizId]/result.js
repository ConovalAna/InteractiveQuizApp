import styles from "../../../styles/quiz.module.css";
import React from "react";
import { useRouter } from "next/router";
import Navbar from "@/pages/components/navBar";

export default function QuizResult({ quiz }) {
  const router = useRouter();

  return (
    <>
      <Navbar />
      <div className={styles.quizContainer}>
        <h2>Quiz: {quiz.name}</h2>
        <h3>
          Your score is: {router.query.score} / {quiz?.questions?.length}
          <p>
            {router.query.score >= quiz?.questions?.length * 0.7
              ? "You did a great job"
              : "Try again"}
          </p>
        </h3>
      </div>
    </>
  );
}

export async function getServerSideProps({ params }) {
  try {
    const request = await fetch(`http://localhost:3000/${params.quizId}.json`);
    const quiz = await request.json();

    return { props: { quiz } };
  } catch (error) {
    console.error("Error fetching quiz data:", error);
    return {
      notFound: true,
    };
  }
}
