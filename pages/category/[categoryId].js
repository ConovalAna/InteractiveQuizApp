import styles from "../../styles//quiz.module.css";
import Link from "next/link";
import Navbar from "../components/navBar";

export default function Category({ quizzes }) {
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

export async function getStaticProps({ params }) {
  try {
    const request = await fetch(
      `http://localhost:3000/${params.categoryId}.json`
    );
    const quizzes = await request.json();

    return {
      props: { quizzes },
    };
  } catch (ex) {
    console.error(ex);
    return {
      props: { quizzes: null },
    };
  }
}

export async function getStaticPaths() {
  try {
    const request = await fetch(`http://localhost:3000/categories.json`);
    const categories = await request.json();

    const paths = categories.map(({ name }) => {
      return { params: { categoryId: name } };
    });

    return {
      paths: paths,
      fallback: false,
    };
  } catch (ex) {
    console.error(ex);
    return {
      paths: [],
      fallback: false,
    };
  }
}
