import { Button } from '@/components/button';
import { Header } from '@/components/header';
import { Input } from '@/components/input';
import { LinkButton } from '@/components/link-button';
import { Product } from '@/components/product';
import { formatCurrency } from '@/lib/fomatters';
import { ProductCartProps, useCartStore } from '@/stores/cart-store';
import { Feather } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Alert, ScrollView, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function Cart() {
  const [products, removeProduct, addProduct] = useCartStore((state) => [
    state.products,
    state.remove,
    state.add,
  ]);

  const total = formatCurrency(
    products.reduce((acc, product) => acc + product.price, 0)
  );

  function handleRemoveProduct(product: ProductCartProps) {
    if (product.quantity !== 1) return removeProduct(product.id);

    Alert.alert(
      'Remover',
      `Deseja remover o produto ${product.title} do carrinho?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
          isPreferred: true,
        },
        {
          text: 'Remover',
          onPress: () => removeProduct(product.id),
        },
      ]
    );
  }

  return (
    <View className='flex-1 pt-8 bg-slate-900'>
      <Header title='Seu carrinho' showCart={false} />

      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className='p-5 flex-1'>
            {products.length ? (
              <View className='border-b border-slate-700'>
                {products.map((product) => (
                  <Link
                    asChild
                    key={product.id}
                    href={`/product/${product.id}`}
                  >
                    <Product
                      data={product}
                      activeOpacity={0.7}
                      onMinusPress={() => handleRemoveProduct(product)}
                      onPlusPress={() => addProduct(product)}
                    />
                  </Link>
                ))}
              </View>
            ) : (
              <Text className='text-center text-slate-400 font-body my-8'>
                Seu carrinho está vazio
              </Text>
            )}

            <View className='flex-row gap-2 items-center mt-5 mb-4'>
              <Text className='text-white text-xl font-subtitle'>Total:</Text>
              <Text className='text-lime-400 text-2xl font-heading'>
                {total}
              </Text>
            </View>

            <Input placeholder='Informe o endereço de entrega incluindo rua, bairro, número e complemento...' />
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>

      <View className='p-5 gap-5'>
        <Button>
          <Button.Text>Enviar pedido</Button.Text>

          <Button.Icon>
            <Feather name='arrow-right-circle' size={20} />
          </Button.Icon>
        </Button>

        <LinkButton title='Voltar ao cardápio' href='..' />
      </View>
    </View>
  );
}
