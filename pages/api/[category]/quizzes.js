export default async function quizzes(req, res) {
  const category = req.query.category;
  const request = await fetch(`http://localhost:3000/${category}.json`);
  const quizzes = await request.json();

  const quizzesAndQuestions = await Promise.all(
    quizzes.map(async ({ id, name }) => {
      const newRequest = await fetch(`http://localhost:3000/${id}.json`);
      const quiz = await newRequest.json();
      return { quiz, name, id };
    })
  );

  res.status(200).json(quizzesAndQuestions);
}
