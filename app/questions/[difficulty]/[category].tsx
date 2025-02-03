import { getCategories, getQuestions } from "@/api/axios";
import QuestionComponent from "@/app/components/QuestionComponent";
import { LocalSearchParams, UserQuestion } from "@/types/common";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { useState } from "react";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";

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
  const onSubmitPres = () => {
    const correctAnswers = userAnswers.filter(
      (item) => item.userAnswer === item.correctAnswer
    );

    const incorrectAnswers = userAnswers.filter(
      (item) => item.userAnswer !== item.correctAnswer
    );
    console.log("Correct Answers:", correctAnswers);
    console.log("Incorrect Answers:", incorrectAnswers);
  };
  console.log(userAnswers);
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text>Difficulty: {difficulty}</Text>
        <Text>Category: {activeCategory?.name}</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        {questions?.map((question) => (
          <QuestionComponent
            key={question.question}
            question={question}
            setUserAnswers={setUserAnswers}
          />
        ))}
      </ScrollView>
      <Button
        title="Submit"
        onPress={onSubmitPres}
        disabled={userAnswers.length !== questions?.length}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  textContainer: { padding: 10, backgroundColor: "white" },
  scrollView: {
    flex: 1,
    marginBottom: 20,
    padding: 10,
    borderTopWidth: 1,
  },
});
