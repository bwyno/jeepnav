import React, { useContext } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { styles } from '../../style';
import mapStyle from '../../../assets/mapStyle.json';
import Search from '../../components/Search';
import DynamicPolyline from '../../components/DynamicPolyline';
import { FAB } from 'react-native-paper';
import { RouteContext } from '../../context/Route';

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
        onPress={() => console.log('pressed')}
      />
    </>
  );
}
