import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import he from "he";
import { QuestionComponentTypes } from "@/types/propTypes";
import { useQuestionComponent } from "./useQuestionComponent";

const QuestionComponent: React.FC<QuestionComponentTypes> = ({
  question,
  setUserAnswers,
}) => {
  const { answers, selectedOption, onPress } = useQuestionComponent(
    question,
    setUserAnswers
  );

  return (
    <View key={question.question}>
      <Text style={styles.textContainer}>{he.decode(question.question)}</Text>
      {answers.map((option, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => onPress(option)}
          style={[
            styles.touchableOpacity,
            selectedOption === option ? styles.active : styles.inactive,
          ]}
        >
          <Text style={styles.optionText}>{he.decode(option)}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default QuestionComponent;

const styles = StyleSheet.create({
  container: { flex: 1 },
  textContainer: { fontSize: 16, marginBottom: 10, fontWeight: "bold" },
  touchableOpacity: {
    padding: 10,
    marginBottom: 5,
  },
  active: {
    backgroundColor: "blue",
  },
  inactive: {
    backgroundColor: "gray",
  },
  optionText: { color: "white" },
});
