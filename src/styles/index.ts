import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowSpread: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  spaceEvenly: {
    justifyContent: 'space-evenly',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
  iconSize20: {
    width: 20,
    height: 20,
  },
  iconSize: {
    width: 25,
    height: 25,
  },
  tabBarContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 30,
    backgroundColor: COLORS.white,
  },
  svgTabContainer: {flexDirection: 'row', position: 'absolute', top: 0},
  svgTabButton: {
    top: -22.5,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.white,
  },
  tabButton: {
    height: 60,
    backgroundColor: COLORS.white,
  },
  // home screen styles
  headerContainer: {flexDirection: 'row', height: 50},
  homeHCLIcon: {
    width: 50,
    paddingLeft: SIZES.padding * 2,
    justifyContent: 'center',
  },
  homeHCRIcon: {
    width: 50,
    paddingRight: SIZES.padding * 2,
    justifyContent: 'center',
  },
  homeHCISize: {
    width: 30,
    height: 30,
  },
  homeHCLocation: {
    width: '70%',
    height: '100%',
    backgroundColor: COLORS.lightGray3,
    borderRadius: SIZES.radius,
  },
  menuIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.white,
  },
  homeRestaurantCover: {
    width: '100%',
    height: 200,
    borderRadius: SIZES.radius,
  },
  duration: {
    position: 'absolute',
    bottom: 0,
    height: 50,
    width: SIZES.width * 0.3,
    backgroundColor: COLORS.white,
    borderTopRightRadius: SIZES.radius,
    borderBottomLeftRadius: SIZES.radius,
  },
});

export {styles};
