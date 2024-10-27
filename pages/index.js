import styles from "../styles/home.module.css";
import Link from "next/link";
import Navbar from "./components/navBar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className={styles.mainContainer}>
        <h1>Welcome to quiz page</h1>
        <Link href="/categories">Navigate to categories</Link>
      </div>
    </>
  );
}
