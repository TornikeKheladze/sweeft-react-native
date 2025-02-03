import { getCategories } from "@/api/axios";
import { Difficulty } from "@/types/common";
import { Picker } from "@react-native-picker/picker";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import LoadingSpinner from "./components/LoadingSpinner";

export default function Index() {
  const { push } = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("9");
  const [selectedDifficulty, setSelectedDifficulty] = useState("easy");
  const difficulties: Difficulty[] = ["easy", "medium", "hard"];

  const { data: categories, isLoading } = useQuery({
    queryKey: ["getCategories"],
    queryFn: getCategories,
  });

  const onStartPress = () => {
    push(`/questions/${selectedDifficulty}/${selectedCategory}`);
  };

  return (
    <View style={styles.container}>
      <LoadingSpinner isLoading={isLoading} />
      <Text>Please Choose Category</Text>
      <Picker
        selectedValue={selectedCategory}
        onValueChange={(itemValue) => setSelectedCategory(itemValue)}
        style={styles.picker}
      >
        {categories?.map((category) => (
          <Picker.Item
            key={category.id + category.name}
            label={category.name}
            value={category.id}
          />
        ))}
      </Picker>
      <Text>Please Choose Difficulty</Text>
      <Picker
        selectedValue={selectedDifficulty}
        onValueChange={(itemValue) => setSelectedDifficulty(itemValue)}
        style={styles.picker}
      >
        {difficulties.map((item) => (
          <Picker.Item key={item} label={item} value={item} />
        ))}
      </Picker>
      <Button title="Start Test" onPress={onStartPress} color="blue" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    gap: 10,
  },
  picker: { height: 30, width: "100%" },
});
