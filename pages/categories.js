import Link from "next/link";

export default function Categories({ categories }) {
  return (
    <div className="categories-container">
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
  );
}

export async function getServerSideProps() {
  const request = await fetch(`http://localhost:3000/categories.json`);
  const categories = await request.json();

  return {
    props: { categories },
  };
}
