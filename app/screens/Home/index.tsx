import React, { useContext, useEffect, useRef, useState } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { styles } from '../../style';
import mapStyle from '../../../assets/mapStyle.json';
import Search from '../../components/Search';
import DynamicPolyline from '../../components/DynamicPolyline';
import { FAB, Icon, Switch } from 'react-native-paper';
import { RouteContext } from '../../context/Route';
import Geolocation from '@react-native-community/geolocation';
import { View, Text, AppState } from 'react-native';
import { UserContext } from '../../context/User';
import { ROLE } from '../../constants';
import firestore from '@react-native-firebase/firestore';

export default function Home({ navigation }: any) {
  const { routeData, routeIndex, region, originMarker, destinationMarker } =
    useContext(RouteContext);
  const { userRole, setUserLocation, userLocation, user, setOtherUsers } =
    useContext(UserContext);
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const appState = useRef(AppState.currentState);
  // const [appStateVisible, setAppStateVisible] = useState(appState.current);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App has come to the foreground!');
      }

      appState.current = nextAppState;
      // setAppStateVisible(appState.current);
      console.log('AppState', appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

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

  async function getUserLocation() {
    Geolocation.getCurrentPosition((info: any) => console.log(info));
  }
  useEffect(() => {
    if (userRole === ROLE.DRIVER) {
      Geolocation.watchPosition(
        data => {
          console.log(data);
          setUserLocation({
            latitude: data.coords.latitude,
            longitude: data.coords.longitude,
          });
          firestore()
            .collection('Roles')
            .doc('Driver')
            .collection('Users')
            .doc(user)
            .update({
              latitude: data.coords.latitude,
              longitude: data.coords.longitude,
            })
            .then(() => {
              console.log('User updated!');
            });
        },
        error => {
          console.log(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        },
      );
    } else {
      if (isSwitchOn) {
        const subscriber = firestore()
          .collection('Roles')
          .doc('Driver')
          .collection('Users')
          .onSnapshot(data => {
            console.log(data);
            setOtherUsers(data.docs);
          });
        return () => subscriber();
      }
    }
  }, [isSwitchOn, setOtherUsers, setUserLocation, user, userRole]);

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
        {userLocation && (
          <Marker coordinate={userLocation}>
            <Icon source="arrow-down-drop-circle" size={25} color="green" />
          </Marker>
        )}
        {originMarker && <Marker coordinate={originMarker} />}
        {destinationMarker && <Marker coordinate={destinationMarker} />}
      </MapView>
      <Search navigation={navigation} />
      {userRole === ROLE.COMMUTER && (
        <View style={styles.bottomView}>
          <View style={styles.switchView}>
            <Switch
              value={isSwitchOn}
              onValueChange={onToggleSwitch}
              style={styles.switch}
            />
            <Text style={styles.switchText}>VIEW JEEPNEYS</Text>
          </View>

          <FAB
            icon="location-enter"
            style={styles.fab}
            onPress={() => getUserLocation()}
          />
        </View>
      )}
    </>
  );
}
