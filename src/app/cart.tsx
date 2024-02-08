import { Button } from '@/components/button';
import { Header } from '@/components/header';
import { Input } from '@/components/input';
import { LinkButton } from '@/components/link-button';
import { Product } from '@/components/product';
import { formatCurrency } from '@/lib/fomatters';
import { ProductCartProps, useCartStore } from '@/stores/cart-store';
import { Feather } from '@expo/vector-icons';
import { Link, useNavigation } from 'expo-router';
import { useState } from 'react';
import { Alert, Linking, ScrollView, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function Cart() {
  const [address, setAddress] = useState('');

  const { goBack } = useNavigation();
  const [products, removeProduct, addProduct, clearCartProducts] = useCartStore(
    (state) => [state.products, state.remove, state.add, state.clear]
  );

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

  function handleOrder() {
    if (!address) {
      return Alert.alert(
        'Atenção',
        'Por favor, informe o endereço de entrega.'
      );
    }

    const finalProducts = products
      .map((product) => `\n😋 *${product.quantity} ${product.title}*`)
      .join('');

    const message = `🍔 *Novo pedido de compra:*
      \nOlá, gostaria de fazer um pedido com os seguintes itens: ${finalProducts}
      \nEndereço de entrega: *${address}*
      \nTotal do pedido: *${total}*`;

    Linking.openURL(
      `https://wa.me/${process.env.EXPO_PUBLIC_PHONE_NUMBER}?text=${message}`
    );

    clearCartProducts();
    goBack();
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

            <Input
              blurOnSubmit
              returnKeyType='go'
              onChangeText={setAddress}
              onSubmitEditing={handleOrder}
              placeholder='Informe o endereço de entrega incluindo rua, bairro, número e complemento...'
            />
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>

      <View className='p-5 gap-5'>
        <Button onPress={handleOrder}>
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
