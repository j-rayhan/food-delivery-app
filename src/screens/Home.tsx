import * as React from 'react';
import { View, Text, Image } from 'react-native';
import { icons } from '../constants';
import { styles } from '../styles';

const Home: React.FC<{ title: string }> = ({ title }) => {
  return (
    <View style={[styles.container, styles.center]}>
      <Image
        source={icons.car}
        resizeMode="contain"
        style={{
          width: 37,
          height: 44,
        }}
      />
      <Text>
        Edit {title}.tsx to change this screen.
           </Text>
    </View>
  );
};

export default Home;