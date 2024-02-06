import { CategoryButton } from '@/components/category-button';
import { Header } from '@/components/header';
import { useState } from 'react';
import { FlatList, View } from 'react-native';
import { CATEGORIES } from '../../utils/data/products';

export default function App() {
  const [selectedItem, setSelectedItem] = useState(CATEGORIES[0]);

  return (
    <View className='flex-1 pt-8'>
      <Header title='Faça seu pedido' cartQuantityItems={3} />

      <FlatList
        horizontal
        data={CATEGORIES}
        className='mt-5'
        keyExtractor={(categoryName) => categoryName}
        contentContainerStyle={{ paddingHorizontal: 20, gap: 12 }}
        renderItem={({ item }) => (
          <CategoryButton
            title={item}
            isSelected={selectedItem === item}
            onPress={() => setSelectedItem(item)}
          />
        )}
      />
    </View>
  );
}
