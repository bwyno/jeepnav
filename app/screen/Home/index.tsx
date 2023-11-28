import React, { useContext, useEffect } from 'react';
import { View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import customMap from '../../../assets/customMap.json';
import { StyleSheet } from 'react-native';
import { useWindowDimensions } from 'react-native';
import { UserContext } from '../../context/User';
import { FAB } from 'react-native-paper';

export default function Home() {
  const { height, width } = useWindowDimensions();
  const { getUserLocation } = useContext(UserContext);
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
        initialRegion={initialRegion()}
      />
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
