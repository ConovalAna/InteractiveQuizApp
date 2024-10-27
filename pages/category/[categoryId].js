import styles from "../../styles//quiz.module.css";
import Link from "next/link";
import Navbar from "../components/navBar";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Category() {
  const router = useRouter();
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    if (router.query.categoryId) {
      loadQuizzes(router.query.categoryId);
    }
  }, [router.query]);

  async function loadQuizzes(categoryId) {
    try {
      const response = await fetch(
        `http://localhost:3000/api/${categoryId}/quizzes`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch quizzes");
      }
      const quizzesData = await response.json();
      setQuizzes(quizzesData);
    } catch (error) {
      console.error("Error loading quizzes:", error);
    }
  }

  return (
    <>
      <Navbar />
      <div className={styles.quizContainer}>
        <h1>Please select a quiz:</h1>
        <ul>
          {quizzes.map(({ name, id }, index) => (
            <li key={index}>
              <Link href={`/quiz/${id}`} id={id}>
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
