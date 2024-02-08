import { ProductProps } from '@/lib/data/products';
import { create } from 'zustand';
import { addProduct, removeProduct } from './actions/cart-actions';

export type ProductCartProps = ProductProps & {
  quantity: number;
};

type StateProps = {
  products: ProductCartProps[];
  add: (product: ProductProps) => void;
  remove: (id: string) => void;
};

export const useCartStore = create<StateProps>((set) => ({
  products: [],
  add: (product) => {
    set((state) => addProduct(state.products, product));
  },
  remove: (id) => {
    set((state) => removeProduct(state.products, id));
  },
}));
