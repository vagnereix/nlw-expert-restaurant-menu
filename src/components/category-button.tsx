import { cn } from '@/lib/utils';
import { Pressable, PressableProps, Text } from 'react-native';

type CategoryButtonProps = PressableProps & {
  title: string;
  isSelected?: boolean;
};

export function CategoryButton({
  title,
  isSelected,
  ...pressableProps
}: CategoryButtonProps) {
  return (
    <Pressable
      className={cn(
        'bg-slate-800 px-4 justify-center rounded-md h-10',
        isSelected && 'border-2 border-lime-300'
      )}
      {...pressableProps}
    >
      <Text className='text-slate-100 font-subtitle text-sm'>{title}</Text>
    </Pressable>
  );
}
