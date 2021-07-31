import * as React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import MapView, { MapViewProps, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { styles } from '../styles';
import { RestaurantType, RootStackParamList, MapRegionType } from '../constants/types';
import { COLORS, icons, FONTS, GOOGLE_API_KEY, SIZES } from "../constants";
import MapViewDirections from 'react-native-maps-directions';
const calculateAngle = coordinates => {
  const startLat = coordinates[0].latitude
  const startLong = coordinates[0].longitude
  const endLat = coordinates[0].latitude
  const endLong = coordinates[0].longitude
  const dx = endLat - startLat
  const dy = endLong - startLong

  return Math.atan2(dy, dx) * 180 / Math.PI;
}
const OrderDelivery = ({
  navigation,
  route,
}: StackScreenProps<RootStackParamList, 'OrderDelivery'>) => {
  const mapViewRef = React.useRef<MapViewProps | any>(null);
  const [restaurant, setRestaurant] = React.useState<RestaurantType | null>(null);
  const [strateName, setStrateName] = React.useState<string>('');
  const [fromLocation, setFromLocation] = React.useState<any | null>(null);
  const [toLocation, setToLocation] = React.useState<any | null>(null);
  const [region, setRegion] = React.useState<MapRegionType | undefined>(undefined);
  const [duration, setDuration] = React.useState<number>(8)
  const [isReady, setReady] = React.useState<boolean>(false)
  const [angle, setAngle] = React.useState<number>(0)
  React.useEffect(() => {
    const { restaurant, currentLocation: { gps: fromLoc, streetName } } = route.params;
    const { location: toLoc } = restaurant;
    let mapRegion: MapRegionType = {
      latitude: (fromLoc.latitude + toLoc.latitude) / 2,
      longitude: (fromLoc.longitude + toLoc.longitude) / 2,
      latitudeDelta: Math.abs(fromLoc.latitude - toLoc.latitude) * 2,
      longitudeDelta: Math.abs(fromLoc.longitude - toLoc.longitude) * 2,
    }
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
    }
    switch (type) {
      case 'decrement':
        newRegion.latitudeDelta = (region?.latitudeDelta ?? 0) * 2
        newRegion.longitudeDelta = (region?.longitudeDelta ?? 0) * 2
        break;
      case 'increment':
        newRegion.latitudeDelta = (region?.latitudeDelta ?? 0) / 2
        newRegion.longitudeDelta = (region?.longitudeDelta ?? 0) / 2
        break;
      default:
        break;
    }
    setRegion(newRegion);
    mapViewRef.current.animateToRegion(newRegion, 200)
  }
  const renderMap = () => {
    const destinationMarker = () => {
      return (
        <Marker
          coordinate={toLocation}
        >
          <View
            style={[styles.center, {
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: COLORS.white
            }]}
          >
            <View
              style={[styles.center, {
                width: 30,
                height: 30,
                borderRadius: 15,
                backgroundColor: COLORS.primary
              }]}
            >
              <Image
                source={icons.pin}
                style={{
                  width: 25,
                  height: 25,
                  tintColor: COLORS.white
                }}
              />
            </View>

          </View>
        </Marker>
      )
    }
    const carIcon = () => {
      return (
        <Marker
          coordinate={fromLocation}
          anchor={{ x: 0.5, y: 0.5 }}
          flat={true}
          rotation={angle}
        >
          <Image
            source={icons.car}
            style={{
              width: 40,
              height: 40
            }}
          />
        </Marker>
      )
    }
    return (
      <View style={{ flex: 1 }}>
        <MapView
          ref={mapViewRef}
          initialRegion={region}
          style={{ flex: 1 }}
        >
          <MapViewDirections
            origin={fromLocation}
            destination={toLocation}
            strokeWidth={5}
            apikey={GOOGLE_API_KEY}
            strokeColor={COLORS.primary}
            optimizeWaypoints={true}
            onReady={(result) => {
              setDuration(7)
              // setDuration(result.duration)
              if (!isReady) {
                // Fit route into map
                mapViewRef?.current?.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    right: (SIZES.width / 20),
                    bottom: (SIZES.height / 4),
                    left: (SIZES.width / 20),
                    top: (SIZES.height / 8),
                  }
                })
                // Position the car
                const nextLoc = {
                  latitude: result.coordinates[0].latitude,
                  longitude: result.coordinates[0].longitude
                }
                if (result.coordinates.length > 2) {
                  const angle = calculateAngle(result.coordinates)
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
    )
  }
  const renderDestinationHeader = () => {
    return (<View
      style={[
        styles.center,
        {
          position: 'absolute',
          top: 50,
          height: 50,
          left: 0,
          right: 0
        }
      ]}
    >
      <View
        style={[
          styles.row,
          {
            width: SIZES.width * 0.9,
            paddingVertical: SIZES.padding,
            paddingHorizontal: SIZES.padding * 2,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.white
          }]}
      >
        <Image
          source={icons.red_pin}
          style={{
            width: 30,
            height: 30,
            marginRight: SIZES.padding
          }}
        />
        <View style={{ flex: 1 }}>
          <Text style={{ ...FONTS.body3 }}>{strateName}</Text>
        </View>
        <Text style={{ ...FONTS.body3 }}>{Math.ceil(duration)} mins</Text>

      </View>
    </View>)
  }
  const renderDeliveryInfo = () => {
    return (<View
      style={[
        styles.center,
        {
          position: 'absolute',
          bottom: 50,
          left: 0,
          right: 0
        }
      ]}
    >
      <View
        style={[
          {
            width: SIZES.width * 0.9,
            paddingVertical: SIZES.padding * 3,
            paddingHorizontal: SIZES.padding * 2,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.white
          }]}
      >
        <View
          style={[
            styles.row
          ]}
        >
          <Image
            source={restaurant?.courier.avatar}
            style={{
              width: 50,
              height: 50,
              borderRadius: 25
            }}
          />
          <View style={{ flex: 1, marginLeft: SIZES.padding }}>
            {/* name & rating */}
            <View style={[styles.rowSpread]}>
              <Text style={{ ...FONTS.h4 }}>{restaurant?.courier.name}</Text>
              <View style={{ flexDirection: 'row' }}>
                <Image
                  source={icons.star}
                  style={{
                    width: 18,
                    height: 18,
                    tintColor: COLORS.primary,
                    marginRight: SIZES.padding
                  }}
                />
                <Text style={{ ...FONTS.body3 }}>{restaurant?.rating}</Text>
              </View>
            </View>
            <Text style={{ color: COLORS.darkgray, ...FONTS.body4 }}>{restaurant?.name}</Text>
          </View>
        </View>
        {/* Buttons */}
        <View style={[
          {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: SIZES.padding
          }
        ]}>
          <TouchableOpacity
            onPress={() => { navigation.navigate('Home') }}
            style={[styles.center, {
              height: 50,
              flex: 1,
              marginRight: SIZES.padding,
              backgroundColor: COLORS.primary,
              borderRadius: SIZES.padding
            }]}>
            <Text style={{ ...FONTS.h4, color: COLORS.white }}>Call</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => { navigation.goBack() }}
            style={[styles.center, {
              height: 50,
              flex: 1,
              backgroundColor: COLORS.secondary,
              borderRadius: SIZES.padding
            }]}>
            <Text style={{ ...FONTS.h4, color: COLORS.white }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>)
  }

  const renderButtons = () => {
    return (
      <View
        style={{
          position: 'absolute',
          bottom: SIZES.height * 0.3,
          right: SIZES.padding * 2,
          width: 60,
          height: 130,
          justifyContent: 'space-between',
        }}
      >
        {/* Zoom in */}
        <TouchableOpacity
          onPress={() => handleZoon('increment')}
          style={[
            styles.center,
            {
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: COLORS.white
            }]}>
          <Text style={FONTS.body1}>+</Text>
        </TouchableOpacity>
        {/* Zoom out */}
        <TouchableOpacity
          onPress={() => handleZoon('decrement')}
          style={[
            styles.center,
            {
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: COLORS.white
            }]}>
          <Text style={FONTS.body1}>-</Text>
        </TouchableOpacity>
      </View>
    )
  }
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
