import { useState } from "react";
import styles from "../../styles/quiz.module.css";

export default function AddQuestionForm({ onAddQuestion }) {
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState(["", ""]); // Start with two answer fields
  const [correctAnswer, setCorrectAnswer] = useState(0);

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleAddAnswer = () => {
    if (answers.length < 5) {
      setAnswers([...answers, ""]);
    }
  };

  const handleRemoveAnswer = (index) => {
    if (answers.length > 2) {
      const newAnswers = answers.filter((_, i) => i !== index);
      setAnswers(newAnswers);

      if (correctAnswer >= index) {
        setCorrectAnswer(correctAnswer - 1);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newQuestion = {
      question,
      answers,
      correctAnswer: [correctAnswer],
    };
    onAddQuestion(newQuestion);

    setQuestion("");
    setAnswers(["", ""]);
    setCorrectAnswer(0);
  };

  return (
    <form className={styles.addQuestionForm} onSubmit={handleSubmit}>
      <h2>Add nee question</h2>

      <div>
        <label>Question:</label>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Answers:</label>
        {answers.map((answer, index) => (
          <div key={index} className={styles.answerField}>
            <input
              type="text"
              value={answer}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
              required
            />
            {answers.length > 2 && (
              <button
                type="button"
                onClick={() => handleRemoveAnswer(index)}
                className={styles.removeAnswerButton}
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>

      {answers.length < 5 && (
        <button
          type="button"
          onClick={handleAddAnswer}
          className={styles.addAnswerButton}
        >
          Add answer
        </button>
      )}

      <div>
        <label>Correct answer:</label>
        <select
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(parseInt(e.target.value))}
        >
          {answers.map((_, index) => (
            <option key={index} value={index}>
              {index + 1}
            </option>
          ))}
        </select>
      </div>

      <button type="submit">Add</button>
    </form>
  );
}
