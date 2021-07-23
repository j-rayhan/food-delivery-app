import * as React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {
  createBottomTabNavigator,
  BottomTabBarButtonProps,
  BottomTabBar,
  BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import Svg, {Path} from 'react-native-svg';
import {isIphoneX} from 'react-native-iphone-x-helper';

import {COLORS, icons} from '../constants';
import {Home} from '../screens';
import {BottomTabParamList} from '../constants/types';
import {styles} from '../styles';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        showLabel: false,
        style: {
          position: 'absolute',
          left: 0,
          bottom: 0,
          right: 0,
          borderTopWidth: 0,
          backgroundColor: 'transparent',
          elevation: 0,
        },
      }}
      tabBar={props => <TabBarX {...props} />}>
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            <TabBarIcon name={icons.cutlery} active={focused} />
          ),
          tabBarButton: props => <TabButtonX {...props} />,
        }}
      />
      <BottomTab.Screen
        name="Search"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            <TabBarIcon name={icons.search} active={focused} />
          ),
          tabBarButton: props => <TabButtonX {...props} />,
        }}
      />
      <BottomTab.Screen
        name="Like"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            <TabBarIcon name={icons.like} active={focused} />
          ),
          tabBarButton: props => <TabButtonX {...props} />,
        }}
      />
      <BottomTab.Screen
        name="User"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            <TabBarIcon name={icons.user} active={focused} />
          ),
          tabBarButton: props => <TabButtonX {...props} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

const TabBarIcon = (props: {
  name: React.ComponentProps<typeof Image>['source'];
  active: boolean;
}) => {
  return (
    <Image
      source={props.name}
      resizeMode="contain"
      style={{
        ...styles.iconSize,
        tintColor: props.active ? COLORS.primary : COLORS.secondary,
      }}
    />
  );
};

const TabButtonX = ({
  accessibilityState,
  children,
  onPress,
}: BottomTabBarButtonProps) => {
  const isSelected = accessibilityState?.selected;
  if (isSelected) {
    return (
      <View style={[styles.container, styles.center]}>
        <View style={styles.svgTabContainer}>
          <View style={{...styles.container, backgroundColor: COLORS.white}} />
          <Svg width={75} height={61} viewBox="0 0 75 61">
            <Path
              fill={COLORS.white}
              d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
            />
          </Svg>
          <View style={{...styles.container, backgroundColor: COLORS.white}} />
        </View>
        <TouchableOpacity
          onPress={onPress}
          style={[styles.center, styles.svgTabButton]}>
          {children}
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={1}
        style={[styles.container, styles.tabButton]}>
        {children}
      </TouchableOpacity>
    );
  }
};

const TabBarX = (props: BottomTabBarProps) => {
  if (isIphoneX()) {
    return (
      <View>
        <View style={styles.tabBarContainer}>
          <BottomTabBar {...props} />
        </View>
      </View>
    );
  } else {
    return <BottomTabBar {...props} />;
  }
};
