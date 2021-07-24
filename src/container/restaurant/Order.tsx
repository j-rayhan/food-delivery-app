import {useNavigation} from '@react-navigation/core';
import * as React from 'react';
import {View, Animated, Text, Image, TouchableOpacity} from 'react-native';
import {isIphoneX} from 'react-native-iphone-x-helper';
import {COLORS, FONTS, icons, SIZES} from '../../constants';
import {initialCurrentLocation} from '../../constants/data';
import {RestaurantType} from '../../constants/types';
import {styles} from '../../styles';

const Order: React.FC<{
  scrollX: any;
  restaurant: RestaurantType | null;
  getBasketItem: number;
  sumOrder: number;
}> = ({scrollX, restaurant, getBasketItem, sumOrder}) => {
  const navigation = useNavigation();
  const renderDots = () => {
    const dotPosition = Animated.divide(scrollX, SIZES.width);
    return (
      <View style={{height: SIZES.padding * 3}}>
        <View
          style={[
            styles.row,
            styles.center,
            {
              height: SIZES.padding,
            },
          ]}>
          {restaurant?.menu?.map((item, index) => {
            const opacity = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            });
            const dotSize = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [SIZES.base * 0.8, 10, SIZES.base * 0.8],
              extrapolate: 'clamp',
            });

            const dotColor = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [COLORS.darkgray, COLORS.primary, COLORS.darkgray],
              extrapolate: 'clamp',
            });

            return (
              <Animated.View
                key={`dot-${index}`}
                style={{
                  opacity,
                  width: dotSize,
                  height: dotSize,
                  backgroundColor: dotColor,
                  marginHorizontal: SIZES.padding2 / 2,
                  borderRadius: SIZES.radius,
                }}
              />
            );
          })}
        </View>
      </View>
    );
  };
  return (
    <View>
      {renderDots()}
      <View
        style={{
          borderTopLeftRadius: SIZES.padding * 4,
          borderTopRightRadius: SIZES.padding * 4,
          backgroundColor: COLORS.white,
        }}>
        <View
          style={[
            styles.rowSpread,
            {
              paddingVertical: SIZES.padding * 2,
              paddingHorizontal: SIZES.padding * 3,
              borderBottomWidth: SIZES.padding * 0.1,
              borderBottomColor: COLORS.lightGray2,
            },
          ]}>
          <Text style={{...FONTS.h3}}>{getBasketItem} items in cart</Text>
          <Text style={{...FONTS.h3}}>${sumOrder}</Text>
        </View>
        <View
          style={[
            styles.rowSpread,
            {
              paddingVertical: SIZES.padding * 2,
              paddingHorizontal: SIZES.padding * 3,
            },
          ]}>
          <View style={styles.row}>
            <Image
              source={icons.pin}
              resizeMode="contain"
              style={[
                styles.iconSize20,
                {
                  tintColor: COLORS.darkgray,
                },
              ]}
            />
            <Text style={{...FONTS.h4, marginLeft: SIZES.padding}}>
              Location
            </Text>
          </View>

          <View style={styles.row}>
            <Image
              source={icons.master_card}
              resizeMode="contain"
              style={[
                styles.iconSize20,
                {
                  tintColor: COLORS.darkgray,
                },
              ]}
            />
            <Text style={{...FONTS.h4, marginLeft: SIZES.padding}}>8888</Text>
          </View>
        </View>
        {/* Order button */}
        <View style={[styles.center, {padding: SIZES.padding * 2}]}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('OrderDelivery', {
                restaurant,
                currentLocation: initialCurrentLocation,
              })
            }
            style={[
              styles.alignCenter,
              {
                width: SIZES.width * 0.9,
                padding: SIZES.padding,
                backgroundColor: COLORS.primary,
                borderRadius: SIZES.radius,
              },
            ]}>
            <Text style={{...FONTS.h2, color: COLORS.white}}>Order</Text>
          </TouchableOpacity>
        </View>
      </View>
      {isIphoneX() && (
        <View
          style={[styles.tabBarContainer, {bottom: -(SIZES.padding * 3)}]}
        />
      )}
    </View>
  );
};

export default Order;
