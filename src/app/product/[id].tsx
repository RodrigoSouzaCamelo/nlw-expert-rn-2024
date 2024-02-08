import { Button } from "@/components/button";
import { PRODUCTS } from "@/utils/data/products";
import { formatCurrency } from "@/utils/functions/format-currency";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Image, View, Text } from "react-native";
import { Feather } from '@expo/vector-icons';
import { LinkButton } from "@/components/link-button";
import { useCardStore } from "@/stores/card-store";
import { toast } from "@/utils/functions/toast";

export default function Product() {
  const cardStore = useCardStore();
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();

  const product = PRODUCTS.filter(item => item.id === id)[0];

  function handleAddToCart() {
    cardStore.add(product);
    navigation.goBack();
    toast("Adicionado", "Item adicionado ao carrinho")
  }

  return (
    <View className="flex-1">
      <Image 
        source={product.cover} 
        className="w-full h-52" 
        resizeMode="cover"
      />

      <View className="p-5 mt-8 flex-1">
        <Text className="text-lime-400 text-2xl font-heading my-2">
          {formatCurrency(product.price)}
        </Text>

        <Text className="text-slate-400 font-body text-base leading-6 mb-6">
          {product.description}
        </Text>

        {
          product.ingredients.map((ingredient) => (
            <Text key={ingredient} className="text-slate-400 font-body text-base leading-6">
              {'\u2022'} {ingredient}
            </Text>
          ))
        }
      </View>

      <View className="p-5 pb-8 gap-5">
        <Button onPress={handleAddToCart}>
          <Button.Icon>
            <Feather name="plus-circle" />
          </Button.Icon>
          
          <Button.Text>Adicionar ao pedido</Button.Text>
        </Button>

        <LinkButton title="Voltar ao cardápio" href="/" />
      </View>
    </View>
  );
}