import styles from "../styles/category.module.css";
import Link from "next/link";
import Navbar from "./components/navBar";

export default function Categories({ categories }) {
  return (
    <>
      <Navbar />
      <div className={styles.categoriesContainer}>
        <h1>Please select a category to pass a quiz:</h1>
        <ul>
          {categories.map(({ name, src }, index) => (
            <li key={index}>
              <Link href={`/category/${name}`}>{name}</Link>
              <img src={src} alt={name} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const request = await fetch(`http://localhost:3000/categories.json`);
  const categories = await request.json();

  return {
    props: { categories },
  };
}
