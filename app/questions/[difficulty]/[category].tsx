import QuestionComponent from "@/app/components/QuestionComponent";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";
import ResultQuestion from "@/app/components/ResultQuestion";
import { useQuestions } from "@/hooks/useQuestion";

export default function Questions() {
  const {
    setUserAnswers,
    showResult,
    userAnswers,
    questions,
    difficulty,
    activeCategory,
    onSubmitPres,
    correctAnswers,
    onTryAgainPress,
    loading,
  } = useQuestions();

  if (loading) return <LoadingSpinner isLoading={loading} />;

  return (
    <View style={styles.container}>
      <Modal
        isVisible={showResult}
        backdropOpacity={100}
        animationIn="fadeIn"
        animationOut="fadeOut"
      >
        <View>
          <Text style={styles.resultText}>
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
  resultText: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,
    backgroundColor: "rgba(156, 163, 175)",
    color: "blue",
  },
});
