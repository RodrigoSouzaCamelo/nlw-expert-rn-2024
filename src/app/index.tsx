import { CategoryButton } from "@/components/category-button";
import { Header } from "@/components/header";
import { Product } from "@/components/product";
import { useCardStore } from "@/stores/card-store";
import { CATEGORIES, MENU } from "@/utils/data/products";
import { Link } from "expo-router";
import { useRef, useState } from "react";
import { View, FlatList, SectionList, Text } from "react-native";


export default function Home() {
  const cardStore = useCardStore();
  const [category, setCategory] = useState(CATEGORIES[0]);

  const sectionListRef = useRef<SectionList>(null);
  
  const cardQuantityItems = cardStore.products.reduce((prev, curr) => prev + curr.quantity, 0);

  function handleCategorySelected(selectedCategory: string) {
    setCategory(selectedCategory);

    const sectionIndex = CATEGORIES
      .findIndex(category => category === selectedCategory);

    if(sectionListRef.current) {
      sectionListRef.current.scrollToLocation({
        animated: true,
        sectionIndex,
        itemIndex: 0
      })
    }
  }

  return (
    <View className="flex-1 pt-8">
      <Header 
        title="Faça seu pedido" 
        cardQuantityItems={cardQuantityItems}
      />

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

      <SectionList
        ref={sectionListRef}
        className="flex-1 p-5"
        sections={MENU}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => (
          <Link href={`/product/${item.id}`} asChild>
            <Product data={item} />
          </Link>
        )}
        renderSectionHeader={({ section: { title }}) => (
          <Text className="text-xl text-white font-heading mt-8 mb-3">
            {title}
          </Text>
        )}
      />
    </View>
  );
}