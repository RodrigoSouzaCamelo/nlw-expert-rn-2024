import { CategoryButton } from "@/components/category-button";
import { Header } from "@/components/header";
import { CATEGORIES } from "@/utils/data/products";
import { useState } from "react";
import { View, Text, FlatList } from "react-native";


export default function Home() {
  const [category, setCategory] = useState(CATEGORIES[0]);

  function handleCategorySelected(selectedCategory: string) {
    setCategory(selectedCategory);
  }

  return (
    <View className="flex-1 pt-8">
      <Header title="Faça seu pedido" cardQuantityItems={5}/>

      <FlatList 
        data={CATEGORIES}
        keyExtractor={(item) => item}
        horizontal
        className="max-h-10 mt-5"
        contentContainerStyle={{ gap: 12, paddingHorizontal: 20 }}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <CategoryButton 
            title={item}
            isSelected={category === item}
            onPress={() => handleCategorySelected(item)}
          />
        )}
      />
    </View>
  );
}