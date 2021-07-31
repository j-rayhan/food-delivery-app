import { Image } from 'react-native';
import { initialCurrentLocation, restaurantData } from './data';

export type RootStackParamList = {
  NotFound: undefined;
  Home: undefined;
  Restaurant: {
    item: RestaurantType;
    currentLocation: typeof initialCurrentLocation;
  };
  OrderDelivery: {
    restaurant: RestaurantType;
    currentLocation: typeof initialCurrentLocation;
  };
};

export type BottomTabParamList = {
  Home: undefined;
  Search: undefined;
  Like: undefined;
  User: undefined;
};

export type HomeTabParamList = {
  HomeTabScreen: undefined;
};

export type CategoryType = {
  id: number;
  name: string;
  icon: React.ComponentProps<typeof Image>['source'];
};

export type OrderItemType = {
  menuId: number;
  quantity: number;
  price: number;
  total: number;
};
export type RestaurantType = typeof restaurantData[1];

export type MapRegionType = {
  latitude: number,
  longitude: number,
  latitudeDelta: number,
  longitudeDelta: number;
};