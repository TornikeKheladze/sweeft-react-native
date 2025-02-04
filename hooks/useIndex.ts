import { getCategories } from "@/api/axios";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

export const useIndex = () => {
  const { push } = useRouter();
  const difficulties = [
    { id: "easy", name: "EASY" },
    { id: "medium", name: "MEDIUM" },
    { id: "hard", name: "HARD" },
  ];
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [selectedDifficulty, setSelectedDifficulty] = useState(
    difficulties[0].id
  );

  const {
    data: categories,
    isLoading,
    isFetched,
  } = useQuery({
    queryKey: ["getCategories"],
    queryFn: getCategories,
  });
  useEffect(() => {
    if (isFetched && !isLoading && categories?.length) {
      setSelectedCategory(categories[0].id);
    }
  }, [isFetched]);

  const onStartPress = () => {
    push(`/questions/${selectedDifficulty}/${selectedCategory}`);
  };

  return {
    isLoading,
    categories,
    difficulties,
    selectedCategory,
    selectedDifficulty,
    setSelectedCategory,
    setSelectedDifficulty,
    onStartPress,
  };
};
