import { ProductProps } from "@/utils/data/products";
import { create } from "zustand";
import * as cartInMemory from './helpers/card-in-memory';

export type ProductCartProps = ProductProps & {
  quantity: number;
}

type StateProps = {
  products: ProductCartProps[];
  add: (product: ProductProps) => void;
  remove: (productId: string) => void;
}

export const useCardStore = create<StateProps>((set) => ({
  products: [],
  add: (product: ProductProps) => {
    set((state) => ({
      products: cartInMemory.add(state.products, product)
    }))
  },
  remove: (productId: string) => 
    set((state) => ({
      products: cartInMemory.remove(state.products, productId)
    }))
}));