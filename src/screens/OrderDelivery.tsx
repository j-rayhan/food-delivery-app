import * as React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import MapView, {
  MapViewProps,
  Marker,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import {styles} from '../styles';
import {
  RestaurantType,
  RootStackParamList,
  MapRegionType,
} from '../constants/types';
import {COLORS, icons, FONTS, GOOGLE_API_KEY, SIZES} from '../constants';
import MapViewDirections from 'react-native-maps-directions';
const calculateAngle = coordinates => {
  const startLat = coordinates[0].latitude;
  const startLong = coordinates[0].longitude;
  const endLat = coordinates[0].latitude;
  const endLong = coordinates[0].longitude;
  const dx = endLat - startLat;
  const dy = endLong - startLong;

  return (Math.atan2(dy, dx) * 180) / Math.PI;
};
const OrderDelivery = ({
  navigation,
  route,
}: StackScreenProps<RootStackParamList, 'OrderDelivery'>) => {
  const mapViewRef = React.useRef<MapViewProps | any>(null);
  const [restaurant, setRestaurant] = React.useState<RestaurantType | null>(
    null,
  );
  const [strateName, setStrateName] = React.useState<string>('');
  const [fromLocation, setFromLocation] = React.useState<any | null>(null);
  const [toLocation, setToLocation] = React.useState<any | null>(null);
  const [region, setRegion] = React.useState<MapRegionType | undefined>(
    undefined,
  );
  const [duration, setDuration] = React.useState<number>(8);
  const [isReady, setReady] = React.useState<boolean>(false);
  const [angle, setAngle] = React.useState<number>(0);
  React.useEffect(() => {
    const {
      restaurant,
      currentLocation: {gps: fromLoc, streetName},
    } = route.params;
    const {location: toLoc} = restaurant;
    let mapRegion: MapRegionType = {
      latitude: (fromLoc.latitude + toLoc.latitude) / 2,
      longitude: (fromLoc.longitude + toLoc.longitude) / 2,
      latitudeDelta: Math.abs(fromLoc.latitude - toLoc.latitude) * 2,
      longitudeDelta: Math.abs(fromLoc.longitude - toLoc.longitude) * 2,
    };
    setRestaurant(restaurant);
    setStrateName(streetName);
    setFromLocation(fromLoc);
    setToLocation(toLoc);
    setRegion(mapRegion);
  }, [route]);
  const handleZoon = (type: string) => {
    let newRegion: MapRegionType = {
      latitude: region?.latitude ?? 0,
      longitude: region?.longitude ?? 0,
      latitudeDelta: region?.latitudeDelta ?? 0,
      longitudeDelta: region?.longitudeDelta ?? 0,
    };
    switch (type) {
      case 'decrement':
        newRegion.latitudeDelta = (region?.latitudeDelta ?? 0) * 2;
        newRegion.longitudeDelta = (region?.longitudeDelta ?? 0) * 2;
        break;
      case 'increment':
        newRegion.latitudeDelta = (region?.latitudeDelta ?? 0) / 2;
        newRegion.longitudeDelta = (region?.longitudeDelta ?? 0) / 2;
        break;
      default:
        break;
    }
    setRegion(newRegion);
    mapViewRef.current.animateToRegion(newRegion, 200);
  };
  const renderMap = () => {
    const destinationMarker = () => {
      return (
        <Marker coordinate={toLocation}>
          <View
            style={[
              styles.center,
              {
                width: SIZES.sz40,
                height: SIZES.sz40,
                borderRadius: SIZES.sz40 / 2,
                backgroundColor: COLORS.white,
              },
            ]}>
            <View
              style={[
                styles.center,
                {
                  width: SIZES.sz30,
                  height: SIZES.sz30,
                  borderRadius: SIZES.sz40 / 2,
                  backgroundColor: COLORS.primary,
                },
              ]}>
              <Image
                source={icons.pin}
                style={{
                  width: SIZES.sz25,
                  height: SIZES.sz25,
                  tintColor: COLORS.white,
                }}
              />
            </View>
          </View>
        </Marker>
      );
    };
    const carIcon = () => {
      return (
        <Marker
          coordinate={fromLocation}
          anchor={{x: 0.5, y: 0.5}}
          flat={true}
          rotation={angle}>
          <Image
            source={icons.car}
            style={{
              width: SIZES.sz40,
              height: SIZES.sz40,
            }}
          />
        </Marker>
      );
    };
    return (
      <View style={styles.container1}>
        <MapView
          ref={mapViewRef}
          provider={PROVIDER_GOOGLE}
          initialRegion={region}
          style={styles.container1}>
          <MapViewDirections
            origin={fromLocation}
            destination={toLocation}
            strokeWidth={5}
            apikey={GOOGLE_API_KEY}
            strokeColor={COLORS.primary}
            optimizeWaypoints={true}
            onReady={result => {
              setDuration(result.duration);
              if (!isReady) {
                // Fit route into map
                mapViewRef?.current?.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    right: SIZES.width / 20,
                    bottom: SIZES.height / 4,
                    left: SIZES.width / 20,
                    top: SIZES.height / 8,
                  },
                });
                // Position the car
                const nextLoc = {
                  latitude: result.coordinates[0].latitude,
                  longitude: result.coordinates[0].longitude,
                };
                if (result.coordinates.length > 2) {
                  const angle = calculateAngle(result.coordinates);
                  setAngle(angle);
                }
                setFromLocation(nextLoc);
                setReady(true);
              }
            }}
          />
          {destinationMarker()}
          {carIcon()}
        </MapView>
      </View>
    );
  };
  const renderDestinationHeader = () => {
    return (
      <View
        style={[
          styles.center,
          styles.mapAbsoluteContainer,
          {
            top: SIZES.sz50,
            height: SIZES.sz50,
          },
        ]}>
        <View
          style={[
            styles.row,
            {
              width: SIZES.width * 0.9,
              paddingVertical: SIZES.padding,
              paddingHorizontal: SIZES.padding * 2,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.white,
            },
          ]}>
          <Image
            source={icons.red_pin}
            style={{
              width: SIZES.sz30,
              height: SIZES.sz30,
              marginRight: SIZES.padding,
            }}
          />
          <View style={styles.container1}>
            <Text style={{...FONTS.body3}}>{strateName}</Text>
          </View>
          <Text style={{...FONTS.body3}}>{Math.ceil(duration)} mins</Text>
        </View>
      </View>
    );
  };
  const renderDeliveryInfo = () => {
    return (
      <View
        style={[
          styles.center,
          styles.mapAbsoluteContainer,
          {
            bottom: SIZES.sz50,
          },
        ]}>
        <View
          style={[
            {
              width: SIZES.width * 0.9,
              paddingVertical: SIZES.padding * 3,
              paddingHorizontal: SIZES.padding * 2,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.white,
            },
          ]}>
          <View style={[styles.row]}>
            <Image
              source={restaurant?.courier.avatar}
              style={{
                width: SIZES.sz50,
                height: SIZES.sz50,
                borderRadius: SIZES.sz50 / 2,
              }}
            />
            <View style={[styles.container1, {marginLeft: SIZES.padding}]}>
              {/* name & rating */}
              <View style={[styles.rowSpread]}>
                <Text style={{...FONTS.h4}}>{restaurant?.courier.name}</Text>
                <View style={styles.row}>
                  <Image
                    source={icons.star}
                    style={{
                      width: SIZES.body3,
                      height: SIZES.body3,
                      tintColor: COLORS.primary,
                      marginRight: SIZES.padding,
                    }}
                  />
                  <Text style={{...FONTS.body3}}>{restaurant?.rating}</Text>
                </View>
              </View>
              <Text style={{color: COLORS.darkgray, ...FONTS.body4}}>
                {restaurant?.name}
              </Text>
            </View>
          </View>
          {/* Buttons */}
          <View
            style={[
              styles.rowSpread,
              {
                marginTop: SIZES.padding,
              },
            ]}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Home');
              }}
              style={[
                styles.container1,
                styles.center,
                {
                  height: SIZES.sz50,
                  marginRight: SIZES.padding,
                  backgroundColor: COLORS.primary,
                  borderRadius: SIZES.padding,
                },
              ]}>
              <Text style={{...FONTS.h4, color: COLORS.white}}>Call</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={[
                styles.container1,
                styles.center,
                {
                  height: SIZES.sz50,
                  backgroundColor: COLORS.secondary,
                  borderRadius: SIZES.padding,
                },
              ]}>
              <Text style={{...FONTS.h4, color: COLORS.white}}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const renderButtons = () => {
    return (
      <View style={styles.mapButtonsContainer}>
        {/* Zoom in */}
        <TouchableOpacity
          onPress={() => handleZoon('increment')}
          style={[
            styles.center,
            {
              width: SIZES.sz60,
              height: SIZES.sz60,
              borderRadius: SIZES.sz60 / 2,
              backgroundColor: COLORS.white,
            },
          ]}>
          <Text style={FONTS.body1}>+</Text>
        </TouchableOpacity>
        {/* Zoom out */}
        <TouchableOpacity
          onPress={() => handleZoon('decrement')}
          style={[
            styles.center,
            {
              width: SIZES.sz60,
              height: SIZES.sz60,
              borderRadius: SIZES.sz60 / 2,
              backgroundColor: COLORS.white,
            },
          ]}>
          <Text style={FONTS.body1}>-</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={[styles.container]}>
      {renderMap()}
      {renderDestinationHeader()}
      {renderDeliveryInfo()}
      {renderButtons()}
    </View>
  );
};

export default OrderDelivery;
