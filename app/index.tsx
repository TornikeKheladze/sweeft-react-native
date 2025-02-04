import { Button, StyleSheet, Text, View } from "react-native";
import LoadingSpinner from "./components/LoadingSpinner";
import DropdownComponent from "./components/DropdownComponent";
import { useIndex } from "@/hooks/useIndex";

export default function Index() {
  const {
    isLoading,
    categories,
    difficulties,
    selectedCategory,
    selectedDifficulty,
    setSelectedCategory,
    setSelectedDifficulty,
    onStartPress,
  } = useIndex();

  if (isLoading || !categories?.length)
    return <LoadingSpinner isLoading={isLoading} />;

  return (
    <View style={styles.container}>
      <Text style={styles.textContainer}>Select Category and Difficulty</Text>
      <DropdownComponent
        data={difficulties}
        label="Select Difficulty"
        value={selectedDifficulty}
        setValue={setSelectedDifficulty}
      />
      <DropdownComponent
        data={categories}
        label="Select Category"
        value={selectedCategory}
        setValue={setSelectedCategory}
      />
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
  textContainer: { fontSize: 16, marginBottom: 10, fontWeight: "bold" },
});
