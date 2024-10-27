import fs from "fs";
import path from "path";

export default async function quiz(req, res) {
  const quizId = req.query.quizId;
  const filePath = path.join(process.cwd(), "public", `${quizId}.json`);

  if (req.method === "GET") {
    try {
      const request = await fetch(`http://localhost:3000/${quizId}.json`);
      const quiz = await request.json();
      res.status(200).json(quiz);
    } catch (error) {
      res.status(500).json({ error: "Quiz not found." });
    }
  }

  if (req.method === "PUT") {
    try {
      const newQuestion = req.body;
      newQuestion.id = "question-" + Date.now();
      const fileData = fs.readFileSync(filePath, "utf8");
      const quiz = JSON.parse(fileData);

      quiz.questions.push(newQuestion);

      fs.writeFileSync(filePath, JSON.stringify(quiz, null, 2));

      res.status(200).json(quiz);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Unable to update quiz." });
    }
  } else {
    res.setHeader("Allow", ["GET", "PUT"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
