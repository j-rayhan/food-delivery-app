import * as React from 'react';
import { StackScreenProps } from "@react-navigation/stack";
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles';
import { RootStackParamList } from '../constants/types';

const Restaurant = ({ navigation }: StackScreenProps<RootStackParamList, "Restaurant">) => {
  return (
    <View style={[styles.container, styles.center]}>
      <Text>
        Edit Restaurant.tsx to change this screen.
      </Text>

      <TouchableOpacity onPress={() => navigation.replace('OrderDelivery')}>
        <Text>Go to Order Delivery</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Restaurant;