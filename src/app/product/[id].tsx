import { useLocalSearchParams } from 'expo-router';
import { Image, Text, View } from 'react-native';
import { PRODUCTS } from '../../../utils/data/products';
import { formatCurrency } from '@/lib/fomatters';
import { Button } from '@/components/button';
import { Feather } from '@expo/vector-icons';

export default function ProductScreen({}) {
  const { id } = useLocalSearchParams();

  const product = PRODUCTS.find((product) => product.id === id);

  return (
    <View className='flex-1'>
      <Image
        source={product?.cover}
        className='w-full h-60'
        resizeMode='cover'
      />

      <View className='p-5 mt-8 flex-1'>
        <Text className='text-lime-400 text-2xl font-heading my-2'>
          {formatCurrency(product?.price as number)}
        </Text>

        <Text className='text-slate-400 font-body text-base leading-6 mb-6'>
          {product?.description}
        </Text>

        {product?.ingredients.map((ingredient, index) => (
          <Text
            key={ingredient}
            className='text-slate-400 font-body text-base leading-6'
          >
            {'\u2022'} {ingredient}
          </Text>
        ))}
      </View>

      <View className='p-5 pb-8 gap-5'>
        <Button
          className='bg-lime-400'
          onPress={() => alert('Adicionado ao carrinho')}
        >
          <Button.Icon>
            <Feather name='plus-circle' size={20} />
          </Button.Icon>

          <Button.Text>Adicionar ao carrinho</Button.Text>
        </Button>
      </View>
    </View>
  );
}
