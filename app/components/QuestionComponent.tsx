import { shuffleArray } from "@/helpers/shuffleArray";
import { Question } from "@/types/common";
import { useMemo, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

const QuestionComponent: React.FC<{ question: Question }> = ({ question }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const answers = useMemo(() => {
    const options = [...question.incorrect_answers, question.correct_answer];
    return shuffleArray(options);
  }, [question]);

  return (
    <View key={question.question}>
      <Text>{question.question}</Text>
      {answers.map((option, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => setSelectedOption(option)}
          style={{
            padding: 10,
            backgroundColor: selectedOption === option ? "blue" : "gray",
            marginBottom: 5,
          }}
        >
          <Text style={{ color: "white" }}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default QuestionComponent;
