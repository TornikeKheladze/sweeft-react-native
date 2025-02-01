import { getCategories, getQuestions } from "@/api/axios";
import { Category } from "@/types/common";
import { Picker } from "@react-native-picker/picker";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Text, View } from "react-native";

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState("");

  const { data: categories } = useQuery({
    queryKey: ["getCategories"],
    queryFn: getCategories,
  });

  return (
    <View className="bg-red-600">
      <Text style={{ fontSize: 20 }} className="text-green-600">
        Please Choose Category
      </Text>
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
    </View>
  );
}
