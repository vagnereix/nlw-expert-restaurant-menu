import { ProductProps } from '@/lib/data/products';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { addProduct, removeProduct } from './actions/cart-actions';

export type ProductCartProps = ProductProps & {
  quantity: number;
};

type StateProps = {
  products: ProductCartProps[];
  add: (product: ProductProps) => void;
  remove: (id: string) => void;
};

export const useCartStore = create(
  persist<StateProps>(
    (set) => ({
      products: [],
      add: (product) => {
        set((state) => addProduct(state.products, product));
      },
      remove: (id) => {
        set((state) => removeProduct(state.products, id));
      },
    }),
    {
      name: '@nlw.expert:restaurant.menu:cart',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
