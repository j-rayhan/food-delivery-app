import * as React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { View } from 'react-native';
import MapView from 'react-native-maps';
import { styles } from '../styles';
import { RootStackParamList } from '../constants/types';

const OrderDelivery = ({
  navigation,
}: StackScreenProps<RootStackParamList, 'OrderDelivery'>) => {
  const renderMap = () => {
    return (
      <View style={{ flex: 1 }}>
        <MapView style={{ flex: 1 }}>
        </MapView>
      </View>
    )
  }
  return (
    <View style={[styles.container]}>
      {renderMap()}
    </View>
  );
};

export default OrderDelivery;
