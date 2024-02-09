import { Button } from "@/components/button";
import { Header } from "@/components/header";
import { Input } from "@/components/input";
import { Product } from "@/components/product";
import { ProductCartProps, useCardStore } from "@/stores/card-store";
import { formatCurrency } from "@/utils/functions/format-currency";
import { View, Text, ScrollView, Alert, Linking } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Feather } from '@expo/vector-icons';
import { LinkButton } from "@/components/link-button";
import { useState } from "react";
import { useNavigation } from "expo-router";

const PHONE_NUMBER = "+55 (DDD) Number Phone"

export default function Cart() {
  const cardStore = useCardStore();
  const navigation = useNavigation();
  const [address, setAddress] = useState("");

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
    ]);
  }

  function handleOrder() {
    if(address.trim().length === 0) {
      return Alert.alert("Pedido", "Informe os dados da entrega.");
    }

    const products = cardStore.products
    .map((product) => `\n ${product.quantity} ${product.title}`)
    .join("");

    const message = `
      NOVO PEDIDO
      \n Entregar em: ${address}

      ${products}

      \n Valor total: ${total}
    `;

    Linking.openURL(`https://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${message}`)

    cardStore.clear();
    navigation.goBack();
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

            <Input 
              blurOnSubmit={true}
              returnKeyType="next"
              onSubmitEditing={handleOrder}
              onChangeText={(text) => setAddress(text)}
              placeholder="Informe o endereço de entrega com rua, bairro, CEP, número e complemento..." 
            />
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>

      <View className="p-5 gap-5">
        <Button onPress={handleOrder}>
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