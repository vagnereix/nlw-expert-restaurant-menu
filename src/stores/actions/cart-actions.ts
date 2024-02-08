import { ProductCartProps } from '@/stores/cart-store';

export function addProduct(
  products: ProductCartProps[],
  product: Omit<ProductCartProps, 'quantity'>
) {
  const productIndex = products.findIndex((p) => p.id === product.id);

  if (productIndex !== -1) {
    products[productIndex].quantity += 1;
    return { products: products };
  }

  return { products: [...products, { ...product, quantity: 1 }] };
}

export function removeProduct(products: ProductCartProps[], id: string) {
  const productIndex = products.findIndex((p) => p.id === id);

  if (productIndex !== -1) {
    products[productIndex].quantity -= 1;

    if (products[productIndex].quantity === 0) {
      products.splice(productIndex, 1);
    }

    return { products: products };
  }

  return { products: products };
}
