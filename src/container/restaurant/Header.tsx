import {useNavigation} from '@react-navigation/core';
import * as React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {COLORS, FONTS, icons, SIZES} from '../../constants';
import {styles} from '../../styles';

const Header: React.FC<{restaurantName: string | undefined}> = ({
  restaurantName,
}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.row}>
      <TouchableOpacity
        style={styles.homeHCLIcon}
        onPress={() => navigation.goBack()}>
        <Image
          source={icons.back}
          resizeMode="contain"
          style={styles.homeHCISize}
        />
      </TouchableOpacity>
      <View style={[styles.container, styles.center]}>
        <View
          style={[
            styles.center,
            {
              height: SIZES.padding * 5,
              paddingHorizontal: SIZES.padding * 3,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.lightGray3,
            },
          ]}>
          <Text style={{...FONTS.h3}}>{restaurantName}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.homeHCRIcon}
        onPress={() => navigation.goBack()}>
        <Image
          source={icons.list}
          resizeMode="contain"
          style={styles.homeHCISize}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
