import Link from "next/link";

export default function Home() {
  return (
    <div class="main-container">
      <h1>Welcome to quiz page</h1>
      <Link href="/categories">Navigate to categories</Link>
    </div>
  );
}
