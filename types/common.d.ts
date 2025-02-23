export type Category = {
  id: string;
  name: string;
};

export type Difficulty = "hard" | "easy" | "medium";

export type Question = {
  category: string;
  correct_answer: string;
  difficulty: Difficulty;
  incorrect_answers: string[];
  question: string;
  type: "multiple" | "boolean";
};

export type LocalSearchParams = {
  difficulty: Difficulty;
  category: string;
};

export type UserQuestion = {
  question: string;
  userAnswer: string;
  correctAnswer: string;
  allAnswers: string[];
};
