import { View, Text, TouchableOpacity } from "react-native";
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
      <Text style={{ fontSize: 16, marginBottom: 10, fontWeight: "bold" }}>
        {he.decode(question.question)}
      </Text>
      {answers.map((option, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => onPress(option)}
          style={{
            padding: 10,
            backgroundColor: selectedOption === option ? "blue" : "gray",
            marginBottom: 5,
          }}
        >
          <Text style={{ color: "white" }}>{he.decode(option)}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default QuestionComponent;
