import React, { useContext, useEffect } from 'react';
import { View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import customMap from '../../../assets/customMap.json';
import { StyleSheet } from 'react-native';
import { useWindowDimensions } from 'react-native';
import { UserContext } from '../../context/User';
import { FAB, Icon } from 'react-native-paper';
import { RouteContext } from '../../context/Route';
import DynamicPolyline from '../../components/DynamicPolyline';

export default function Home() {
  const { height, width } = useWindowDimensions();
  const { getUserLocation, userLocation } = useContext(UserContext);
  const { routeData, routeIndex, region } = useContext(RouteContext);

  /**
   * Set Initial Region to Cebu
   * @returns initialRegion
   */
  function initialRegion() {
    return {
      latitude: 10.3157,
      longitude: 123.8854,
      latitudeDelta: 0.5,
      longitudeDelta: 0.5,
    };
  }

  useEffect(() => {
    getUserLocation();
  });

  return (
    <View style={{ height, width }}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        customMapStyle={customMap}
        region={region}
        initialRegion={initialRegion()}>
        {userLocation && (
          <Marker
            coordinate={{ latitude: 10.37964284, longitude: 123.98322678 }}
            centerOffset={{ x: 0, y: 0 }}>
            <View
              style={{
                borderRadius: 25,
                borderWidth: 1,
                borderColor: 'tomato',
                margin: 0,
              }}>
              <Icon source="human-male" size={25} color="tomato" />
            </View>
            <View
              style={{
                position: 'absolute',
              }}>
              <Icon source="arrow-up" size={20} color="red" />
            </View>
          </Marker>
        )}
        {routeData?.routes && (
          <DynamicPolyline route={routeData.routes[routeIndex]} />
        )}
      </MapView>
      <FAB
        icon="location-enter"
        style={styles.fab}
        onPress={() => {
          getUserLocation();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
