import * as React from 'react';
import {View, Animated} from 'react-native';
import {COLORS, SIZES} from '../../constants';
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
  return <View>{renderDots()}</View>;
};

export default Order;
