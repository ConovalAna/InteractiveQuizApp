import React, { createContext, useState, useEffect, useContext } from "react";

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [sharedQuiz, setSharedQuiz] = useState({});

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("sharedQuiz"));
    if (storedData) {
      setSharedQuiz(storedData);
    }
  }, []);

  useEffect(() => {
    if (sharedQuiz) {
      localStorage.setItem("sharedQuiz", JSON.stringify(sharedQuiz));
    }
  }, [sharedQuiz]);

  return (
    <QuizContext.Provider value={{ sharedQuiz, setSharedQuiz }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuizContext = () => {
  const context = useContext(QuizContext);

  if (!context) {
    throw new Error("useQuizContext must be used within a DataProvider");
  }

  return context;
};
