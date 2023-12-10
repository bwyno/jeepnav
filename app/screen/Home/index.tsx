/* eslint-disable react-native/no-inline-styles */
import React, { useContext, useEffect } from 'react';
import { View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import customMap from '../../../assets/customMap.json';
import { StyleSheet } from 'react-native';
import { useWindowDimensions, Text } from 'react-native';
import { UserContext } from '../../context/User';
import { Icon, ToggleButton } from 'react-native-paper';
import { RouteContext } from '../../context/Route';
import DynamicPolyline from '../../components/DynamicPolyline';
import firestore from '@react-native-firebase/firestore';

export default function Home() {
  const { height, width } = useWindowDimensions();
  const { getUserLocation, userLocation, userHeading, userRole } =
    useContext(UserContext);
  const { routeData, routeIndex, region, filteredJeepneyCodes } =
    useContext(RouteContext);
  const [status, setStatus] = React.useState<any>('unchecked');
  const [showOthers, setShowOthers] = React.useState<any>('unchecked');
  const [otherUsers, setOtherUsers] = React.useState<any>();

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

  const onButtonToggle = (_value: any) => {
    setStatus(status === 'checked' ? 'unchecked' : 'checked');
  };
  const onToggleShowOthers = (_value: any) => {
    setShowOthers(showOthers === 'checked' ? 'unchecked' : 'checked');
  };
  useEffect(() => {
    getUserLocation();
    if (userRole === 'commuter' && routeData) {
      const subscriber = firestore()
        .collection('Roles')
        .doc('Driver')
        .collection('Users')
        .onSnapshot((data: any) => {
          setOtherUsers(data.docs);
        });
      return () => subscriber();
    }
  });

  return (
    <View style={{ height, width }}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        customMapStyle={customMap}
        region={region}
        initialRegion={initialRegion()}>
        {userLocation && status === 'checked' && (
          <>
            <Marker
              coordinate={{ latitude: 10.3796966579, longitude: 123.98272816 }}
              anchor={{ x: 0.5, y: 0.5 }}>
              <View
                style={{
                  height: 70,
                  width: 70,
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: [{ rotate: `${userHeading}deg` }],
                }}>
                <View
                  style={{
                    borderRadius: 25,
                    borderWidth: 1,
                    borderColor: 'tomato',
                    margin: 0,
                  }}>
                  <Icon source="human" size={25} color="tomato" />
                </View>
                <View
                  style={{
                    position: 'absolute',
                    top: 0,
                  }}>
                  <Icon source="arrow-up" size={25} color="red" />
                </View>
              </View>
            </Marker>
          </>
        )}
        {otherUsers &&
          showOthers === 'checked' &&
          otherUsers.map(
            (user: any, index: any) =>
              user._data.is_active &&
              filteredJeepneyCodes.includes(user._data.jeepney_code) && (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: user._data.latitude,
                    longitude: user._data.longitude,
                  }}>
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <View
                      style={{
                        height: 70,
                        width: 70,
                        alignItems: 'center',
                        justifyContent: 'center',
                        transform: [{ rotate: `${user._data.heading}deg` }],
                      }}>
                      <View
                        style={{
                          borderRadius: 25,
                          borderWidth: 1,
                          borderColor: 'tomato',
                          margin: 0,
                        }}>
                        <Icon source="jeepney" size={25} color="green" />
                      </View>
                      <View
                        style={{
                          position: 'absolute',
                          top: 0,
                        }}>
                        <Icon source="arrow-up" size={25} color="red" />
                      </View>
                    </View>
                    <View
                      style={{
                        position: 'absolute',
                        bottom: 0,
                      }}>
                      <Text style={{ color: 'white' }}>
                        {user._data.jeepney_code}
                      </Text>
                    </View>
                  </View>
                </Marker>
              ),
          )}
        {routeData?.routes && (
          <DynamicPolyline route={routeData.routes[routeIndex]} />
        )}
      </MapView>
      <ToggleButton
        icon={status === 'checked' ? 'shield-home' : 'shield-home-outline'}
        value="bluetooth"
        status={status}
        onPress={onButtonToggle}
        iconColor="tomato"
        style={styles.toggleButtonA}
        size={40}
      />
      <ToggleButton
        icon={showOthers === 'checked' ? 'jeepney' : 'car-off'}
        value="bluetooth"
        status={showOthers}
        onPress={onToggleShowOthers}
        iconColor="tomato"
        style={styles.toggleButtonB}
        size={40}
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
  toggleButtonA: {
    position: 'absolute',
    margin: 0,
    right: 0,
    bottom: 70,
    borderColor: 'tomato',
    borderWidth: 1,
  },
  toggleButtonB: {
    position: 'absolute',
    margin: 0,
    right: 45,
    bottom: 70,
    borderColor: 'tomato',
    borderWidth: 1,
  },
});
