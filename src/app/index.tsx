import { CategoryButton } from '@/components/category-button';
import { Header } from '@/components/header';
import { useMemo, useRef, useState } from 'react';
import { FlatList, SectionList, Text, View } from 'react-native';
import { CATEGORIES, MENU, ProductProps } from '../../utils/data/products';
import { Product } from '@/components/product';
import { Link } from 'expo-router';
import { useCartStore } from '@/stores/cart-store';

export default function App() {
  const { products } = useCartStore();

  const sectionListRef = useRef<SectionList<ProductProps>>(null);
  const [selectedItem, setSelectedItem] = useState(CATEGORIES[0]);

  const cartQuantityItems = useMemo(() => {
    return products.reduce((acc, product) => acc + product.quantity, 0);
  }, [products]);

  function handleSelectCategory(categoryName: string) {
    setSelectedItem(categoryName);

    const index = CATEGORIES.indexOf(categoryName);
    sectionListRef.current?.scrollToLocation({
      animated: true,
      sectionIndex: index,
      itemIndex: 0,
    });
  }

  return (
    <View className='flex-1 pt-8'>
      <Header title='Faça seu pedido' cartQuantityItems={cartQuantityItems} />

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
            onPress={() => handleSelectCategory(item)}
          />
        )}
      />

      <SectionList
        sections={MENU}
        ref={sectionListRef}
        className='flex-1 p-5'
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        renderItem={({ item }) => (
          <Link href={`/product/${item.id}`} asChild>
            <Product data={item} activeOpacity={0.7} />
          </Link>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text className='text-white text-xl font-heading mt-8 mb-2'>
            {title}
          </Text>
        )}
      />
    </View>
  );
}
