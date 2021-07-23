import * as React from 'react';
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../constants';
import {categoryData} from '../../constants/data';
import {CategoryType} from '../../constants/types';
import {styles} from '../../styles';

const MainCategory: React.FC<{
  title: string;
  handleSelectCategory: (item: CategoryType) => void;
  selectedCategory: CategoryType | null;
}> = ({title, handleSelectCategory, selectedCategory}) => {
  const renderItem = ({item}: {item: CategoryType}) => {
    return (
      <TouchableOpacity
        onPress={() => handleSelectCategory(item)}
        style={[
          styles.center,
          styles.shadow,
          {
            padding: SIZES.padding,
            paddingBottom: SIZES.padding * 2,
            marginRight: SIZES.padding,
            borderRadius: SIZES.radius,
            backgroundColor:
              selectedCategory?.id === item.id ? COLORS.primary : COLORS.white,
          },
        ]}>
        <View style={[styles.center, styles.menuIcon]}>
          <Image
            source={item.icon}
            resizeMode="contain"
            style={styles.homeHCISize}
          />
        </View>
        <Text
          style={{
            marginTop: SIZES.padding,
            color:
              selectedCategory?.id === item.id ? COLORS.white : COLORS.black,
            ...FONTS.body5,
          }}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{padding: SIZES.padding * 2}}>
      <Text style={{...FONTS.h1}}>{title.split(' ')[0]}</Text>
      <Text style={{...FONTS.h1}}>{title.split(' ')[1]}</Text>
      <FlatList
        data={categoryData}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => `${item.id}`}
        renderItem={renderItem}
        contentContainerStyle={{paddingVertical: SIZES.padding * 2}}
      />
    </View>
  );
};

export default MainCategory;
