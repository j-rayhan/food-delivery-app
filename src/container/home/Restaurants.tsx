import {useNavigation} from '@react-navigation/core';
import * as React from 'react';
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import {COLORS, FONTS, icons, SIZES} from '../../constants';
import {initialCurrentLocation} from '../../constants/data';
import {RestaurantType} from '../../constants/types';
import {styles} from '../../styles';

const Restaurants: React.FC<{
  data: RestaurantType[];
  getCategoryName: (id: number) => string;
}> = ({data, getCategoryName}) => {
  const navigation = useNavigation();
  const renderItem = ({item}: {item: RestaurantType}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Restaurant', {
            item,
            currentLocation: initialCurrentLocation,
          })
        }
        style={{
          marginBottom: SIZES.padding * 2,
        }}>
        {/* Image */}
        <View style={{marginBottom: SIZES.padding}}>
          <Image
            source={item.photo}
            resizeMode="cover"
            style={styles.homeRestaurantCover}
          />
          <View style={[styles.center, styles.shadow, styles.duration]}>
            <Text style={{...FONTS.h4}}>{item.duration}</Text>
          </View>
        </View>
        {/* Restaurant info */}
        <Text style={{...FONTS.body2}}>{item.name}</Text>
        <View
          style={{
            marginTop: SIZES.padding,
            ...styles.row,
          }}>
          <Image
            source={icons.star}
            resizeMode="contain"
            style={{
              ...styles.iconSize20,
              tintColor: COLORS.primary,
              marginRight: SIZES.padding,
            }}
          />
          <Text style={{...FONTS.body3}}>{item.rating}</Text>
          {/* Categories label */}
          <View style={[styles.row, {marginLeft: SIZES.padding}]}>
            {item?.categories?.map(categoryId => {
              return (
                <View style={styles.row} key={categoryId}>
                  <Text style={{...FONTS.body3}}>
                    {getCategoryName(categoryId)}
                  </Text>
                  <Text style={{...FONTS.h4, color: COLORS.darkgray}}>, </Text>
                </View>
              );
            })}
            {/* Price */}
            {[1, 2, 3].map(price => (
              <Text
                style={{
                  ...FONTS.body3,
                  color:
                    price <= item.priceRating ? COLORS.black : COLORS.darkgray,
                }}>
                $
              </Text>
            ))}
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={item => `${item.id}`}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingHorizontal: SIZES.padding * 2,
          paddingBottom: SIZES.height * 0.4,
        }}
      />
    </View>
  );
};

export default Restaurants;
