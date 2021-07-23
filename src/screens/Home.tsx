import * as React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {SafeAreaView} from 'react-native';
import {styles} from '../styles';
import {
  CategoryType,
  RestaurantType,
  RootStackParamList,
} from '../constants/types';
import Header from '../container/home/Header';
import MainCategory from '../container/home/MainCategory';
import {restaurantData} from '../constants/data';
import Restaurants from '../container/home/Restaurants';

const Home = ({}: StackScreenProps<RootStackParamList, 'Home'>) => {
  const [selectedCategory, setSelectedCategory] =
    React.useState<CategoryType | null>(null);
  const [selectedRestaurant, setSelectedRestaurant] =
    React.useState<RestaurantType[]>(restaurantData);
  const handleSelectCategory = (category: CategoryType) => {
    // filter restaurant
    const res = restaurantData.filter(m => m.categories.includes(category.id));
    setSelectedRestaurant(res);
    setSelectedCategory(category);
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <MainCategory
        title="Main Categories"
        handleSelectCategory={handleSelectCategory}
        selectedCategory={selectedCategory}
      />
      <Restaurants data={selectedRestaurant} />
    </SafeAreaView>
  );
};

export default Home;
