import * as React from 'react';
import {Animated, Image, Text, TouchableOpacity, View} from 'react-native';
import {COLORS, FONTS, icons, SIZES} from '../../constants';
import {RestaurantType} from '../../constants/types';
import {styles} from '../../styles';

const FoodInfo: React.FC<{restaurant: RestaurantType | null}> = ({
  restaurant,
}) => {
  return (
    <Animated.ScrollView
      horizontal
      pagingEnabled
      scrollEventThrottle={16}
      snapToAlignment="center"
      showsHorizontalScrollIndicator={false}>
      {restaurant?.menu?.map((item, index) => (
        <View key={`restaurant-menu-${index}`} style={{alignItems: 'center'}}>
          <View style={{height: SIZES.height * 0.35}}>
            {/* Image */}
            <Image
              source={item.photo}
              resizeMode="cover"
              style={{
                width: SIZES.width,
                height: '100%',
              }}
            />
            {/* Quantity */}
            <View
              style={{
                position: 'absolute',
                bottom: -20,
                width: SIZES.width,
                height: 50,
                justifyContent: 'center',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={[
                  styles.center,
                  {
                    width: 50,
                    backgroundColor: COLORS.white,
                    borderTopLeftRadius: SIZES.radius,
                    borderBottomLeftRadius: SIZES.radius,
                  },
                ]}>
                <Text style={{...FONTS.body1}}>-</Text>
              </TouchableOpacity>
              <View
                style={[
                  styles.center,
                  {
                    width: 50,
                    backgroundColor: COLORS.white,
                  },
                ]}>
                <Text style={{...FONTS.h2}}>3</Text>
              </View>
              <TouchableOpacity
                style={[
                  styles.center,
                  {
                    width: 50,
                    backgroundColor: COLORS.white,
                    borderTopRightRadius: SIZES.radius,
                    borderBottomRightRadius: SIZES.radius,
                  },
                ]}>
                <Text style={{...FONTS.body1}}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* Name & description */}
          <View
            style={[
              {
                width: SIZES.width,
                alignItems: 'center',
                marginTop: SIZES.padding * 1.5,
                paddingHorizontal: SIZES.padding * 2,
              },
            ]}>
            <Text
              style={{
                marginVertical: SIZES.padding,
                textAlign: 'center',
                ...FONTS.h2,
              }}>
              {item.name} - {item.price.toFixed(2)}
            </Text>
            <Text style={{...FONTS.body3}}>{item.description}</Text>
          </View>
          {/* Calories */}
          <View
            style={[
              {
                flexDirection: 'row',
                marginTop: SIZES.padding,
              },
            ]}>
            <Image
              source={icons.fire}
              resizeMode="contain"
              style={{
                width: 20,
                height: 20,
                marginRight: SIZES.padding,
              }}
            />
            <Text style={{...FONTS.body3, color: COLORS.darkgray}}>
              {item.calories.toFixed(2)} cal
            </Text>
          </View>
        </View>
      ))}
    </Animated.ScrollView>
  );
};

export default FoodInfo;
