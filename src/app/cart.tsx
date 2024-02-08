import { Header } from '@/components/header';
import { Product } from '@/components/product';
import { formatCurrency } from '@/lib/fomatters';
import { useCartStore } from '@/stores/cart-store';
import { ScrollView, Text, View } from 'react-native';

export default function Cart() {
  const products = useCartStore((state) => state.products);
  const total = formatCurrency(
    products.reduce((acc, product) => acc + product.price, 0)
  );

  return (
    <View className='flex-1 pt-8 bg-slate-900'>
      <Header title='Seu carrinho' showCart={false} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flex: 1 }}
      >
        {products.length ? (
          <View className='p-5 flex-1'>
            {products.map((product) => (
              <Product key={product.id} data={product} activeOpacity={0.7} />
            ))}
          </View>
        ) : (
          <Text className='text-center text-slate-400 font-body my-8'>
            Seu carrinho está vazio
          </Text>
        )}

        <View className='flex-row gap-2 items-center mt-5 mb-4 px-5'>
          <Text className='text-white text-xl font-subtitle'>Total:</Text>
          <Text className='text-lime-400 text-2xl font-heading'>{total}</Text>
        </View>
      </ScrollView>
    </View>
  );
}
