import { getCategories, getQuestions } from "@/api/axios";
import QuestionComponent from "@/app/components/QuestionComponent";
import { LocalSearchParams } from "@/types/common";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { ScrollView, Text, View } from "react-native";

export default function Questions() {
  const { difficulty, category } = useLocalSearchParams<LocalSearchParams>();
  const { data: categories } = useQuery({
    queryKey: ["getCategories"],
    queryFn: getCategories,
  });
  const { data: questions } = useQuery({
    queryKey: ["getQuestions", difficulty, category],
    queryFn: () => getQuestions(category, difficulty),
  });
  const activeCategory = categories?.find(
    (cat) => cat.id.toString() === category
  );
  return (
    <View style={{ flex: 1 }}>
      <Text>Difficulty: {difficulty}</Text>
      <Text>Category: {activeCategory?.name}</Text>
      <ScrollView style={{ flex: 1 }}>
        {questions?.map((question) => (
          <QuestionComponent key={question.question} question={question} />
        ))}
      </ScrollView>
    </View>
  );
}
