import { Question } from "./common";

export type QuestionComponentTypes = {
  question: Question;
  setUserAnswers: React.Dispatch<React.SetStateAction<UserQuestion[]>>;
};

export type LoadingSpinnerProps = { isLoading: boolean };

export type DropdownComponentTypes = {
  data: Category[];
  label: string;
  value: number | undefined | string;
  setValue: Dispatch<SetStateAction<undefined | string>>;
};
