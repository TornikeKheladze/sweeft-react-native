import { shuffleArray } from "@/helpers/shuffleArray";
import { Question, UserQuestion } from "@/types/common";
import { useMemo, useState } from "react";

export const useQuestionComponent = (
  question: Question,
  setUserAnswers: React.Dispatch<React.SetStateAction<UserQuestion[]>>
) => {
  const [selectedOption, setSelectedOption] = useState("");

  const answers = useMemo(() => {
    const options = [...question.incorrect_answers, question.correct_answer];
    return shuffleArray(options);
  }, [question]);

  const onPress = (option: string) => {
    setUserAnswers((prev: UserQuestion[]) => {
      const index = prev.findIndex(
        (item) => item?.question === question.question
      );
      if (index !== -1) {
        const updatedArray = [
          ...prev.slice(0, index),
          {
            ...prev[index],
            userAnswer: option,
            correctAnswer: question.correct_answer,
          },
          ...prev.slice(index + 1),
        ];
        return updatedArray;
      } else {
        return [
          ...prev,
          {
            question: question.question,
            userAnswer: option,
            correctAnswer: question.correct_answer,
          },
        ];
      }
    });
    setSelectedOption(option);
  };
  return { answers, selectedOption, onPress };
};
