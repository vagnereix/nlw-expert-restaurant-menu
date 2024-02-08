import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import colors from 'tailwindcss/colors';
import { Link } from 'expo-router';

type HeaderProps = {
  title: string;
  showCart?: boolean;
  cartQuantityItems?: number;
};

export function Header({
  title,
  showCart = true,
  cartQuantityItems = 0,
}: HeaderProps) {
  return (
    <View className='flex-row items-center border-b border-slate-700 py-5 mx-5'>
      <View className='flex-1'>
        <Image source={require('@/assets/logo.png')} className='h-6 w-32' />
        <Text className='text-white text-xl font-heading mt-2'>{title}</Text>
      </View>

      <TouchableOpacity className='relative' activeOpacity={0.7}>
        {!!cartQuantityItems && (
          <View className='bg-lime-300 h-4 w-4 rounded-full items-center justify-center absolute z-10 -top-1.5 -right-1.5'>
            <Text className='text-slate-900 font-bold text-xs'>
              {cartQuantityItems}
            </Text>
          </View>
        )}

        {showCart && (
          <Link href='/cart' asChild>
            <Feather name='shopping-bag' color={colors.white} size={24} />
          </Link>
        )}
      </TouchableOpacity>
    </View>
  );
}
