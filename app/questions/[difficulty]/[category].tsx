import { getCategories, getQuestions } from "@/api/axios";
import QuestionComponent from "@/app/components/QuestionComponent";
import { LocalSearchParams, UserQuestion } from "@/types/common";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { useState } from "react";
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
  const [userAnswers, setUserAnswers] = useState<UserQuestion[]>([]);
  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text>Difficulty: {difficulty}</Text>
      <Text>Category: {activeCategory?.name}</Text>
      <ScrollView style={{ flex: 1, marginTop: 20 }}>
        {questions?.map((question) => (
          <QuestionComponent
            key={question.question}
            question={question}
            setUserAnswers={setUserAnswers}
          />
        ))}
      </ScrollView>
    </View>
  );
}
