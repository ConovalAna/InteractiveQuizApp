import Link from "next/link";

export async function getStaticProps({ params }) {
  const request = await fetch(
    `http://localhost:3000/${params.categoryId}.json`
  );
  const quizzes = await request.json();

  return {
    props: { quizzes },
  };
}

export default function Category({ quizzes }) {
  return (
    <div class="quiz-container">
      <h1>Please select a quiz:</h1>
      <ul>
        {quizzes.map(({ name, id }, index) => (
          <li key={index}>
            <Link href={`/quiz/${id}`}>{name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticPaths() {
  const request = await fetch(`http://localhost:3000/categories.json`);
  const categories = await request.json();

  console.log(categories);

  const paths = categories.map(({ name }) => {
    return { params: { categoryId: name } };
  });

  return {
    paths: paths,
    fallback: false,
  };
}
