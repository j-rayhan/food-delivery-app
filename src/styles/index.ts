import {StyleSheet} from 'react-native';
import {COLORS} from '../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});

export {styles};
