import { ProductProps } from "@/utils/data/products";
import { ProductCartProps } from "../card-store";

export function add(products: ProductCartProps[], newProduct: ProductProps) {
  const existingProduct = products.find(({ id }) => newProduct.id === id);

  if(existingProduct) {
    return products.map((product) => 
      product.id === newProduct.id 
      ? { ...product, quantity: product.quantity + 1 }
      : product
    )
  }

  return [...products, { ...newProduct, quantity: 1 }]
}

export function remove(products: ProductCartProps[], productId: string) {
  const updatedProduct = products.map((product) => 
    product.id === productId 
    ? {...product, quantity: product.quantity > 0 ? product.quantity - 1 : 0 }
    : product
  );

  return updatedProduct.filter(product => product.quantity);
}