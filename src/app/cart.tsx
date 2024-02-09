import { Button } from "@/components/button";
import { Header } from "@/components/header";
import { Input } from "@/components/input";
import { Product } from "@/components/product";
import { ProductCartProps, useCardStore } from "@/stores/card-store";
import { formatCurrency } from "@/utils/functions/format-currency";
import { View, Text, ScrollView, Alert } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Feather } from '@expo/vector-icons';
import { LinkButton } from "@/components/link-button";

export default function Cart() {
  const cardStore = useCardStore();

  const total = formatCurrency(
    cardStore.products.reduce(
      (prev, curr) => prev + curr.price * curr.quantity, 
      0
    )
  );

  function handleProductRemove(product: ProductCartProps) {
    Alert.alert("Remover", `Deseja remover ${product.title} do carrinho?`, [
      {
        text: 'Cancelar',
      },
      {
        text: 'Remover',
        onPress: () => cardStore.remove(product.id)
      }
    ])
  }

  return (
    <View className="flex-1 pt-8">
      <Header title="Seu carrinho" />

      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        extraHeight={100}
      >
        <ScrollView>
          <View className="p-5 flex-1">
            {cardStore.products.length ? (
              <View className="border-b border-slate-700">
                {
                  cardStore.products.map((product) => (
                    <Product 
                      key={product.id} 
                      data={product} 
                      onPress={() => handleProductRemove(product)}
                    />
                  ))
                }
              </View>
            ) : (
              <Text className="font-body text-slate-400 text-center my-8">
                Seu carrinho está vazio.
              </Text>
            )}

            <View className="flex-row gap-2 items-center mt-5 mb-4">
              <Text className="text-white text-xl font-subtitle">Total: </Text>
              <Text className="text-lime-400 text-2xl font-heading">
                {total}
              </Text>
            </View>

            <Input placeholder="Informe o endereço de entrega com rua, bairro, CEP, número e complemento..." />
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>

      <View className="p-5 gap-5">
        <Button>
          <Button.Text>Enviar pedido</Button.Text>
          <Button.Icon>
            <Feather name="arrow-right-circle" size={20} />
          </Button.Icon>
        </Button>

        <LinkButton title="Voltar ao cardápio." href="/" />
      </View>
    </View>
  )
}