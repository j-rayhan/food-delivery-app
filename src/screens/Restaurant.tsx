import * as React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {SafeAreaView} from 'react-native';
import {styles} from '../styles';
import {RestaurantType, RootStackParamList} from '../constants/types';
import Header from '../container/restaurant/Header';
import FoodInfo from '../container/restaurant/FoodInfo';
// import {initialCurrentLocation} from '../constants/data';

const Restaurant = ({
  route,
}: StackScreenProps<RootStackParamList, 'Restaurant'>) => {
  // const [location, setLocation] = React.useState<
  //   typeof initialCurrentLocation | undefined
  // >(undefined);
  const [restaurant, setRestaurant] = React.useState<RestaurantType | null>(
    null,
  );

  React.useLayoutEffect(() => {
    const {item} = route.params;
    // setLocation(currentLocation);
    setRestaurant(item);
  }, [route]);
  return (
    <SafeAreaView style={styles.container}>
      <Header restaurantName={restaurant?.name} />
      <FoodInfo restaurant={restaurant} />
    </SafeAreaView>
  );
};

export default Restaurant;
