import { Feather } from '@expo/vector-icons';
import { forwardRef } from 'react';
import {
  Image,
  ImageProps,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import colors from 'tailwindcss/colors';

type ProductData = {
  title: string;
  quantity?: number;
  description: string;
  thumbnail: ImageProps;
};

type ProductProps = TouchableOpacityProps & {
  data: ProductData;
  onPlusPress?: () => void;
  onMinusPress?: () => void;
};

export const Product = forwardRef<TouchableOpacity, ProductProps>(
  ({ data, onPlusPress, onMinusPress, ...touchableOpacityProps }, ref) => {
    return (
      <TouchableOpacity
        ref={ref}
        className='w-full flex-row items-center pb-4'
        {...touchableOpacityProps}
      >
        <Image source={data.thumbnail} className='w-20 h-20 rounded-md' />

        <View className='flex-1'>
          <View className='ml-3 flex-row items-center justify-between'>
            <Text className='text-slate-100 font-subtitle text-base'>
              {data.title}
            </Text>

            {data.quantity && (
              <Text className='text-slate-400 font-subtitle text-sm'>
                x {data.quantity}
              </Text>
            )}
          </View>

          <View className='ml-3 flex-row'>
            <Text className='text-slate-400 text-xs leading-5 mt-0.5 flex-shrink'>
              {data.description}
            </Text>

            {data.quantity && (
              <View className='pl-2 flex-row items-center gap-2'>
                <TouchableOpacity onPress={onMinusPress}>
                  <Feather
                    name={data.quantity === 1 ? 'trash-2' : 'minus-circle'}
                    size={24}
                    color={colors.red[500]}
                  />
                </TouchableOpacity>

                <TouchableOpacity onPress={onPlusPress}>
                  <Feather
                    size={24}
                    name='plus-circle'
                    color={colors.lime[500]}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  }
);
