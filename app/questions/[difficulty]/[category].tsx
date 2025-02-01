import { getQuestions } from "@/api/axios";
import { Difficulty, LocalSearchParams } from "@/types/common";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useLocalSearchParams, useSearchParams } from "expo-router/build/hooks";
import { Text, View } from "react-native";

export default function Question() {
  const router = useRouter();
  const { difficulty, category } = useLocalSearchParams<LocalSearchParams>();
  const { data } = useQuery({
    queryKey: ["getQuestions", difficulty, category],
    queryFn: () => getQuestions(category, difficulty),
  });
  return (
    <View>
      <Text>Difficulty: {difficulty}</Text>
      <Text>Category: {category}</Text>
    </View>
  );
}
