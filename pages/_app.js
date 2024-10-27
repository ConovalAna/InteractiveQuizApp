import { QuizProvider } from "@/contexts/quiz/quizContext";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <QuizProvider>
      <Component {...pageProps} />
    </QuizProvider>
  );
}
