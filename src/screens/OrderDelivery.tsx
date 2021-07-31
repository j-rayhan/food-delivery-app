import * as React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Image, View } from 'react-native';
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
  const [duration, setDuration] = React.useState<number>(0)
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
  return (
    <View style={[styles.container]}>
      {renderMap()}
    </View>
  );
};

export default OrderDelivery;
