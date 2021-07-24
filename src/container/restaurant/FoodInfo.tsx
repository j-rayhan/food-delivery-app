import * as React from 'react';
import {Animated, Image, Text, TouchableOpacity, View} from 'react-native';
import {COLORS, FONTS, icons, SIZES} from '../../constants';
import {RestaurantType} from '../../constants/types';
import {styles} from '../../styles';

const FoodInfo: React.FC<{
  restaurant: RestaurantType | null;
  scrollX: any;
  handleOrder: (action: string, menuId: number, price: number) => void;
  getOrderQty: (menuId: number) => number;
}> = ({restaurant, scrollX, handleOrder, getOrderQty}) => {
  return (
    <Animated.ScrollView
      horizontal
      pagingEnabled
      scrollEventThrottle={16}
      snapToAlignment="center"
      showsHorizontalScrollIndicator={false}
      onScroll={Animated.event([{nativeEvent: {contentOffset: {x: scrollX}}}], {
        useNativeDriver: false,
      })}>
      {restaurant?.menu?.map((item, index) => (
        <View key={`restaurant-menu-${index}`} style={styles.alignCenter}>
          <View style={{height: SIZES.height * 0.35}}>
            {/* Image */}
            <Image
              source={item.photo}
              resizeMode="cover"
              style={styles.restaurantMenuPhoto}
            />
            {/* Quantity */}
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                onPress={() => handleOrder('-', item.menuId, item.price)}
                style={[
                  styles.center,
                  {
                    width: SIZES.padding * 5,
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
                    width: SIZES.padding * 5,
                    backgroundColor: COLORS.white,
                  },
                ]}>
                <Text style={{...FONTS.h2}}>{getOrderQty(item.menuId)}</Text>
              </View>
              <TouchableOpacity
                onPress={() => handleOrder('+', item.menuId, item.price)}
                style={[
                  styles.center,
                  {
                    width: SIZES.padding * 5,
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
              styles.alignCenter,
              {
                width: SIZES.width,
                marginTop: SIZES.padding * 1.5,
                paddingHorizontal: SIZES.padding * 2,
              },
            ]}>
            <Text
              style={{
                marginVertical: SIZES.padding,
                ...FONTS.h2,
                ...FONTS.center,
              }}>
              {item.name} - {item.price.toFixed(2)}
            </Text>
            <Text style={{...FONTS.body3}}>{item.description}</Text>
          </View>
          {/* Calories */}
          <View
            style={[
              styles.row,
              {
                marginTop: SIZES.padding,
              },
            ]}>
            <Image
              source={icons.fire}
              resizeMode="contain"
              style={[
                styles.iconSize20,
                {
                  marginRight: SIZES.padding,
                },
              ]}
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
