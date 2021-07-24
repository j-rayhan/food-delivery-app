import * as React from 'react';
import {View, Animated, Text, Image, TouchableOpacity} from 'react-native';
import {isIphoneX} from 'react-native-iphone-x-helper';
import {COLORS, FONTS, icons, SIZES} from '../../constants';
import {RestaurantType} from '../../constants/types';
import {styles} from '../../styles';

const Order: React.FC<{scrollX: any; restaurant: RestaurantType | null}> = ({
  scrollX,
  restaurant,
}) => {
  const renderDots = () => {
    const dotPosition = Animated.divide(scrollX, SIZES.width);
    return (
      <View style={{height: 30}}>
        <View
          style={[
            styles.row,
            styles.center,
            {
              height: SIZES.padding2,
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
                  marginHorizontal: 6,
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
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          backgroundColor: COLORS.white,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: SIZES.padding * 2,
            paddingHorizontal: SIZES.padding * 3,
            borderBottomWidth: 1,
            borderBottomColor: COLORS.lightGray2,
          }}>
          <Text style={{...FONTS.h3}}>item. in cart</Text>
          <Text style={{...FONTS.h3}}>$45</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: SIZES.padding * 2,
            paddingHorizontal: SIZES.padding * 3,
          }}>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={icons.pin}
              resizeMode="contain"
              style={{
                width: 20,
                height: 20,
                tintColor: COLORS.darkgray,
              }}
            />
            <Text style={{...FONTS.h4, marginLeft: SIZES.padding}}>
              Location
            </Text>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={icons.master_card}
              resizeMode="contain"
              style={{
                width: 20,
                height: 20,
                tintColor: COLORS.darkgray,
              }}
            />
            <Text style={{...FONTS.h4, marginLeft: SIZES.padding}}>8888</Text>
          </View>
        </View>
        {/* Order button */}
        <View style={[styles.center, {padding: SIZES.padding * 2}]}>
          <TouchableOpacity
            style={{
              width: SIZES.width * 0.9,
              padding: SIZES.padding,
              backgroundColor: COLORS.primary,
              alignItems: 'center',
              borderRadius: SIZES.radius,
            }}>
            <Text style={{...FONTS.h2, color: COLORS.white}}>Order</Text>
          </TouchableOpacity>
        </View>
      </View>
      {isIphoneX() && (
        <View
          style={{
            position: 'absolute',
            bottom: -30,
            left: 0,
            right: 0,
            height: 30,
            backgroundColor: COLORS.white,
          }}
        />
      )}
    </View>
  );
};

export default Order;
