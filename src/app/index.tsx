import { CategoryButton } from '@/components/category-button';
import { Header } from '@/components/header';
import { useState } from 'react';
import { FlatList, SectionList, Text, View } from 'react-native';
import { CATEGORIES, MENU } from '../../utils/data/products';
import { Product } from '@/components/product';

export default function App() {
  const [selectedItem, setSelectedItem] = useState(CATEGORIES[0]);

  return (
    <View className='flex-1 pt-8'>
      <Header title='Faça seu pedido' cartQuantityItems={3} />

      <FlatList
        horizontal
        data={CATEGORIES}
        className='mt-5 max-h-10'
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

      <SectionList
        sections={MENU}
        className='flex-1 p-5'
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        renderItem={({ item }) => <Product data={item} activeOpacity={0.7} />}
        renderSectionHeader={({ section: { title } }) => (
          <Text className='text-white text-xl font-heading mt-8 mb-2'>
            {title}
          </Text>
        )}
      />
    </View>
  );
}
