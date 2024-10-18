import styles from "../../styles/navbar.module.css";
import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <Link href="/" id="home1">
          QuizApp
        </Link>
        <ul className={styles.navMenu}>
          <li className={styles.navItem}>
            <Link href="/" id="home">
              Home
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/categories" id="categories">
              Categories
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
