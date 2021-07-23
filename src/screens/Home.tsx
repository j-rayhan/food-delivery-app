import * as React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {icons} from '../constants';
import {styles} from '../styles';
import {RootStackParamList} from '../constants/types';

const Home = ({navigation}: StackScreenProps<RootStackParamList, 'Home'>) => {
  return (
    <View style={[styles.container, styles.center]}>
      <Image source={icons.car} resizeMode="contain" style={styles.iconSize} />
      <Text>Edit Home.tsx to change this screen.</Text>
      <TouchableOpacity onPress={() => navigation.replace('Restaurant')}>
        <Text>Go to Restaurant</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
