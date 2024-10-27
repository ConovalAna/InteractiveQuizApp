export default async function categories(req, res) {
  const request = await fetch(`http://localhost:3000/categories.json`);
  const categories = await request.json();
  res.status(200).json(categories);
}
