import * as React from 'react';
import {Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
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
      }}>
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            <TabBarIcon name={icons.cutlery} active={focused} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Search"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            <TabBarIcon name={icons.search} active={focused} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Like"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            <TabBarIcon name={icons.like} active={focused} />
          ),
        }}
      />
      <BottomTab.Screen
        name="User"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            <TabBarIcon name={icons.user} active={focused} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
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

// // Each tab has its own navigation stack, you can read more about this pattern here:
// // https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
// const TabOneStack = createStackNavigator<TabOneParamList>();

// function TabOneNavigator() {
//   return (
//     <TabOneStack.Navigator>
//       <TabOneStack.Screen
//         name="TabOneScreen"
//         component={TabOneScreen}
//         options={{ headerShown: false }}
//       />
//     </TabOneStack.Navigator>
//   );
// }

// const TabTwoStack = createStackNavigator<TabTwoParamList>();

// function TabTwoNavigator() {
//   return (
//     <TabTwoStack.Navigator>
//       <TabTwoStack.Screen
//         name="TabTwoScreen"
//         component={TabTwoScreen}
//         options={{ headerShown: false }}
//       />
//     </TabTwoStack.Navigator>
//   );
// }
