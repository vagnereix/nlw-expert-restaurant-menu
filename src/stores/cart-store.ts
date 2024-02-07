import { create } from 'zustand';
import { ProductProps } from '../../utils/data/products';

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
    set((state) => {
      const productIndex = state.products.findIndex((p) => p.id === product.id);

      if (productIndex !== -1) {
        state.products[productIndex].quantity += 1;
        return { products: state.products };
      }

      return { products: [...state.products, { ...product, quantity: 1 }] };
    });
  },
  remove: (id) => {
    set((state) => {
      const productIndex = state.products.findIndex((p) => p.id === id);

      if (productIndex !== -1) {
        state.products[productIndex].quantity -= 1;
        if (state.products[productIndex].quantity === 0) {
          state.products.splice(productIndex, 1);
        }

        return { products: state.products };
      }

      return { products: state.products };
    });
  },
}));
