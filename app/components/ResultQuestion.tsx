import { UserQuestion } from "@/types/common";
import { StyleSheet, Text, View } from "react-native";
import he from "he";
import { AntDesign } from "@expo/vector-icons";

const ResultQuestion: React.FC<{ question: UserQuestion }> = ({ question }) => {
  return (
    <View key={question.question} style={styles.container}>
      <Text style={styles.textContainer}>{he.decode(question.question)}</Text>
      {question.allAnswers.map((option, index) => {
        const answered = option === question.userAnswer;
        const correct = option === question.correctAnswer;
        const correctlyAnswerred = answered && correct;
        const incorrectlyAnswerred = answered && !correct;
        return (
          <View
            key={index}
            style={[
              styles.answersContainer,
              answered ? styles.active : styles.inactive,
              correct && styles.correct,
            ]}
          >
            <View style={styles.optionContainer}>
              <Text style={styles.optionText}>{he.decode(option)}</Text>
              {correctlyAnswerred && (
                <AntDesign color={"white"} name="checkcircle" size={20} />
              )}
              {incorrectlyAnswerred && (
                <AntDesign color={"red"} name="closecircle" size={20} />
              )}
            </View>
          </View>
        );
      })}
    </View>
  );
};
export default ResultQuestion;

const styles = StyleSheet.create({
  container: { marginBottom: 20 },
  textContainer: { fontSize: 16, marginBottom: 10, fontWeight: "bold" },
  answersContainer: {
    padding: 10,
    marginBottom: 5,
  },
  active: {
    backgroundColor: "blue",
    fontSize: 10,
  },
  inactive: {
    backgroundColor: "gray",
  },
  correct: {
    backgroundColor: "green",
  },
  optionText: {
    color: "white",
  },
  optionContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    justifyContent: "space-between",
  },
});
