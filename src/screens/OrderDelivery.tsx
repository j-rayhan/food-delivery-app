import * as React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from '../styles';
import {RootStackParamList} from '../constants/types';

const OrderDelivery = ({
  navigation,
}: StackScreenProps<RootStackParamList, 'OrderDelivery'>) => {
  return (
    <View style={[styles.container, styles.center]}>
      <Text>Edit OrderDelivery.tsx to change this screen.</Text>

      <TouchableOpacity onPress={() => navigation.replace('Home')}>
        <Text>Go to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OrderDelivery;
