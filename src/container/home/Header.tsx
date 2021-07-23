import * as React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {FONTS, icons} from '../../constants';
import {initialCurrentLocation} from '../../constants/data';
import {styles} from '../../styles';

const Header: React.FC<any> = () => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity style={styles.homeHCLIcon}>
        <Image
          source={icons.nearby}
          resizeMode="contain"
          style={styles.homeHCISize}
        />
      </TouchableOpacity>
      <View style={[styles.container, styles.center]}>
        <View style={[styles.center, styles.homeHCLocation]}>
          <Text style={{...FONTS.h3}}>{initialCurrentLocation.streetName}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.homeHCRIcon}>
        <Image
          source={icons.basket}
          resizeMode="contain"
          style={styles.homeHCISize}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
