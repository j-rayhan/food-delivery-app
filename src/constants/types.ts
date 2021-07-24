import {Image} from 'react-native';
import {initialCurrentLocation, restaurantData} from './data';

export type RootStackParamList = {
  NotFound: undefined;
  Home: undefined;
  Restaurant: {
    item: RestaurantType;
    currentLocation: typeof initialCurrentLocation;
  };
  OrderDelivery: undefined;
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

export type RestaurantType = typeof restaurantData[1];
