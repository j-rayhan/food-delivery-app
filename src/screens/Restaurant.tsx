import * as React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {Animated, SafeAreaView} from 'react-native';
import {styles} from '../styles';
import {
  OrderItemType,
  RestaurantType,
  RootStackParamList,
} from '../constants/types';
import Header from '../container/restaurant/Header';
import FoodInfo from '../container/restaurant/FoodInfo';
import Order from '../container/restaurant/Order';
// import {initialCurrentLocation} from '../constants/data';

const Restaurant = ({
  route,
}: StackScreenProps<RootStackParamList, 'Restaurant'>) => {
  const scrollX = new Animated.Value(0);
  // const [location, setLocation] = React.useState<
  //   typeof initialCurrentLocation | undefined
  // >(undefined);
  const [restaurant, setRestaurant] = React.useState<RestaurantType | null>(
    null,
  );
  const [orderItems, setOrderItems] = React.useState<OrderItemType[]>([]);
  React.useLayoutEffect(() => {
    const {item} = route.params;
    // setLocation(currentLocation);
    setRestaurant(item);
  }, [route]);

  const handleOrder = (action: string, menuId: number, price: number) => {
    let orderList = orderItems.slice();
    let item = orderList.filter(o => o.menuId === menuId);
    if (item.length) {
      let newQty = action === '+' ? item[0].quantity + 1 : item[0].quantity - 1;
      item[0].quantity = newQty;
      item[0].total = item[0].quantity * price;
    } else {
      const newItem: OrderItemType = {
        menuId,
        quantity: 1,
        price,
        total: price,
      };
      orderList.push(newItem);
    }
    setOrderItems(orderList);
  };
  const getOrderQty = (id: number) => {
    let orderItem = orderItems.filter(o => o.menuId === id);
    if (orderItem.length) {
      return orderItem[0].quantity;
    } else {
      return 0;
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header restaurantName={restaurant?.name} />
      <FoodInfo
        restaurant={restaurant}
        scrollX={scrollX}
        handleOrder={handleOrder}
        getOrderQty={getOrderQty}
      />
      <Order scrollX={scrollX} restaurant={restaurant} />
    </SafeAreaView>
  );
};

export default Restaurant;
