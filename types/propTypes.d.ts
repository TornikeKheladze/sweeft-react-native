import { Question } from "./common";

export type QuestionComponentTypes = {
  question: Question;
  setUserAnswers: React.Dispatch<React.SetStateAction<UserQuestion[]>>;
};
