import { getCategories } from "@/api/axios";
import { Difficulty } from "@/types/common";
import { Picker } from "@react-native-picker/picker";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Button, Text, View } from "react-native";

export default function Index() {
  const { push } = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("9");
  const [selectedDifficulty, setSelectedDifficulty] = useState("easy");
  const difficulties: Difficulty[] = ["easy", "medium", "hard"];

  const { data: categories } = useQuery({
    queryKey: ["getCategories"],
    queryFn: getCategories,
  });

  const handleStartTest = () => {
    push(`/questions/${selectedDifficulty}/${selectedCategory}`);
  };

  return (
    <View>
      <Text style={{ fontSize: 20 }}>Please Choose Category</Text>
      <Picker
        selectedValue={selectedCategory}
        onValueChange={(itemValue) => setSelectedCategory(itemValue)}
        style={{ height: 30, width: 200 }}
      >
        {categories?.map((category) => (
          <Picker.Item
            key={category.id + category.name}
            label={category.name}
            value={category.id}
          />
        ))}
      </Picker>
      <Text style={{ fontSize: 20, marginTop: 20 }} className="text-red-700">
        Please Choose Difficulty
      </Text>
      <Picker
        selectedValue={selectedDifficulty}
        onValueChange={(itemValue) => setSelectedDifficulty(itemValue)}
        style={{ height: 30, width: 200, marginBottom: 20 }}
      >
        {difficulties.map((item) => (
          <Picker.Item key={item} label={item} value={item} />
        ))}
      </Picker>
      <Button title="Start Test" onPress={handleStartTest} color="blue" />
    </View>
  );
}
