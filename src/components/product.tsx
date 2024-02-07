import {
  Image,
  ImageProps,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';

type ProductData = {
  title: string;
  description: string;
  thumbnail: ImageProps;
};

type ProductProps = TouchableOpacityProps & {
  data: ProductData;
};

export function Product({ data, ...touchableOpacityProps }: ProductProps) {
  return (
    <TouchableOpacity
      className='w-full flex-row items-center pb-4'
      {...touchableOpacityProps}
    >
      <Image source={data.thumbnail} className='w-20 h-20 rounded-md' />

      <View className='flex-1 ml-3'>
        <Text className='text-slate-100 font-subtitle text-base'>
          {data.title}
        </Text>

        <Text className='text-slate-400 text-xs leading-5 mt-0.5'>
          {data.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
