import styles from "../styles/category.module.css";
import Link from "next/link";
import Navbar from "./components/navBar";
import { useEffect, useState } from "react";

export default function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <>
      <Navbar />
      <div className={styles.categoriesContainer}>
        <h1>Please select a category to pass a quiz:</h1>
        <ul>
          {categories.map(({ name, src }, index) => (
            <li key={index}>
              <Link href={`/category/${name}`} id="index">
                {name}
              </Link>
              <img src={src} alt={name} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );

  async function loadCategories() {
    const request = await fetch(`http://localhost:3000/api/categories`);
    const categories = await request.json();

    setCategories(categories);
  }
}
