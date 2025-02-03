import { getCategories, getQuestions } from "@/api/axios";
import QuestionComponent from "@/app/components/QuestionComponent";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import { LocalSearchParams, UserQuestion } from "@/types/common";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router/build/hooks";
import { useState } from "react";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";
import ResultQuestion from "@/app/components/ResultQuestion";

export default function Questions() {
  const { difficulty, category } = useLocalSearchParams<LocalSearchParams>();
  const { push } = useRouter();
  const [userAnswers, setUserAnswers] = useState<UserQuestion[]>([]);
  const [showResult, setShowResult] = useState<boolean>(false);

  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ["getCategories"],
    queryFn: getCategories,
  });
  const { data: questions, isLoading } = useQuery({
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

  return (
    <View style={styles.container}>
      <LoadingSpinner isLoading={isLoading || categoriesLoading} />
      <Modal
        isVisible={showResult}
        backdropOpacity={100}
        animationIn="fadeIn"
        animationOut="fadeOut"
      >
        <View>
          <Text style={styles.textContainer}>
            Results: You have {correctAnswers} correct answers
          </Text>
        </View>
        <View style={styles.modalContainer}>
          <ScrollView style={styles.scrollView}>
            {userAnswers?.map((question) => (
              <ResultQuestion key={question.question} question={question} />
            ))}
          </ScrollView>
        </View>
        <Button title="Try Again" onPress={onTryAgainPress} />
      </Modal>
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
  modalContainer: {
    flex: 1,
    backgroundColor: "white",
  },
});
