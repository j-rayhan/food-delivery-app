import * as React from 'react';
import {View, Text} from 'react-native';
import {RestaurantType} from '../../constants/types';

const Restaurants: React.FC<{data: RestaurantType[]}> = ({data}) => {
  return (
    <View>
      <Text>Edit .tsx to change this screen.</Text>
    </View>
  );
};

export default Restaurants;
