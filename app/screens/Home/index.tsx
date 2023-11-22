import React, { useContext, useEffect } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { styles } from '../../style';
import mapStyle from '../../../assets/mapStyle.json';
import Search from '../../components/Search';
import DynamicPolyline from '../../components/DynamicPolyline';
import { FAB, Icon, Switch } from 'react-native-paper';
import { RouteContext } from '../../context/Route';
import Geolocation from '@react-native-community/geolocation';
import { View, Text } from 'react-native';
import { UserContext } from '../../context/User';
import { ROLE } from '../../constants';
import firestore from '@react-native-firebase/firestore';

export default function Home({ navigation }: any) {
  const { routeData, routeIndex, region, originMarker, destinationMarker } =
    useContext(RouteContext);
  const { userRole, setUserLocation, userLocation, user } =
    useContext(UserContext);
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const [allowTracking, setAllowTracking] = React.useState(false);
  const [otherUsers, setOtherUsers] = React.useState<any>();

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  const trackingSwitch = () => {
    setAllowTracking(!allowTracking);
    if (!allowTracking) {
      firestore()
        .collection('Roles')
        .doc('Driver')
        .collection('Users')
        .doc(user)
        .update({
          isActive: true,
        });
    }
  };

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
    if (userRole === ROLE.DRIVER && allowTracking) {
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
              isActive: true,
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
      const subscriber = firestore()
        .collection('Roles')
        .doc('Driver')
        .collection('Users')
        .onSnapshot((data: any) => {
          setOtherUsers(data.docs);
        });
      return () => subscriber();
    }
  }, [allowTracking, isSwitchOn, otherUsers, setUserLocation, user, userRole]);

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
        {/* {isSwitchOn && <DynamicMarker />} */}
        {otherUsers &&
          isSwitchOn &&
          otherUsers.map(
            (user: any, index: any) =>
              user._data.is_active && (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: user._data.latitude,
                    longitude: user._data.longitude,
                  }}>
                  <Icon source="jeepney" size={25} color="green" />
                </Marker>
              ),
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
      {userRole === ROLE.DRIVER && (
        <View style={styles.bottomView}>
          <View style={styles.switchView}>
            <Switch
              value={isSwitchOn}
              onValueChange={trackingSwitch}
              style={styles.switch}
            />
            <Text style={styles.switchText}>ALLOW TRACKING</Text>
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
