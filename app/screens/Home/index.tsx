import React, { useContext, useEffect } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { styles } from '../../style';
import mapStyle from '../../../assets/mapStyle.json';
import Search from '../../components/Search';
import DynamicPolyline from '../../components/DynamicPolyline';
import { FAB } from 'react-native-paper';
import { RouteContext } from '../../context/Route';
import Geolocation from '@react-native-community/geolocation';

export default function Home({ navigation }: any) {
  const { routeData, routeIndex, region, originMarker, destinationMarker } =
    useContext(RouteContext);
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
  async function getLocation() {
    Geolocation.watchPosition(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      },
    );
  }

  useEffect(() => {
    getLocation();
  });

  return (
    <>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        customMapStyle={mapStyle}
        initialRegion={initialRegion()}
        region={region}>
        {routeData?.routes && (
          <DynamicPolyline route={routeData.routes[routeIndex]} />
        )}
        {originMarker && <Marker coordinate={originMarker} />}
        {destinationMarker && <Marker coordinate={destinationMarker} />}
      </MapView>
      <Search navigation={navigation} />
      <FAB
        icon="location-enter"
        style={styles.fab}
        onPress={() => getLocation()}
      />
    </>
  );
}
