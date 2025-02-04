import { getCategories, getQuestions } from "@/api/axios";
import { LocalSearchParams, UserQuestion } from "@/types/common";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router/build/hooks";
import { useState } from "react";

export const useQuestions = () => {
  const { difficulty, category } = useLocalSearchParams<LocalSearchParams>();
  const { push } = useRouter();
  const [userAnswers, setUserAnswers] = useState<UserQuestion[]>([]);
  const [showResult, setShowResult] = useState<boolean>(false);

  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ["getCategories"],
    queryFn: getCategories,
  });
  const {
    data: questions,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["getQuestions", difficulty, category],
    queryFn: () => getQuestions(category, difficulty),
  });
  const activeCategory = categories?.find(
    (cat) => cat.id.toString() === category
  );
  const onSubmitPres = () => {
    setShowResult(true);
  };
  const correctAnswers = userAnswers.filter(
    (item) => item.userAnswer === item.correctAnswer
  ).length;

  const onTryAgainPress = () => {
    setUserAnswers([]);
    setShowResult(false);
    push("/");
  };
  return {
    categories,
    loading: isLoading || categoriesLoading || isFetching,
    setShowResult,
    push,
    setUserAnswers,
    userAnswers,
    showResult,
    category,
    questions,
    difficulty,
    activeCategory,
    onSubmitPres,
    correctAnswers,
    onTryAgainPress,
  };
};
