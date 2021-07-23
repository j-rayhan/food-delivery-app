import * as React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {SafeAreaView} from 'react-native';
import {styles} from '../styles';
import {RootStackParamList} from '../constants/types';
import Header from '../container/home/Header';

const Home = ({}: StackScreenProps<RootStackParamList, 'Home'>) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
    </SafeAreaView>
  );
};

export default Home;
