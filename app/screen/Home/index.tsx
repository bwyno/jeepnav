/* eslint-disable react-native/no-inline-styles */
import React, { useContext, useEffect } from 'react';
import { View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import customMap from '../../../assets/customMap.json';
import { StyleSheet } from 'react-native';
import { useWindowDimensions, Text } from 'react-native';
import { UserContext } from '../../context/User';
import { Button, Icon, ToggleButton } from 'react-native-paper';
import { RouteContext } from '../../context/Route';
import DynamicPolyline from '../../components/DynamicPolyline';
import firestore from '@react-native-firebase/firestore';
import InfoModal from '../../components/Modals/InfoModal';
import InGeofenceRadius from '../../helpers/InGeofenceRadius';

export default function Home() {
  const { height, width } = useWindowDimensions();
  const {
    getUserLocation,
    userLocation,
    userRole,
    setUserLocation,
    user,
    setSelectedJeep,
    selectedJeep,
  } = useContext(UserContext);
  const {
    routeData,
    routeIndex,
    region,
    setRegion,
    filteredJeepneyCodes,
    filteredJeepneyHeadsigns,
  } = useContext(RouteContext);
  const [status, setStatus] = React.useState<any>('unchecked');
  const [showOthers, setShowOthers] = React.useState<any>('unchecked');
  const [otherUsers, setOtherUsers] = React.useState<any>();
  const [showModal, setShowModal] = React.useState<boolean>();
  const [rideJeepney, setRideJeepney] = React.useState<boolean>();

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

  const onHideModal = () => {
    setShowModal(false);
  };

  const onRideJeepney = () => {
    setShowModal(false);
    setRideJeepney(true);
  };

  const onButtonToggle = (_value: any) => {
    setStatus(status === 'checked' ? 'unchecked' : 'checked');
  };
  const onToggleShowOthers = (_value: any) => {
    setShowOthers(showOthers === 'checked' ? 'unchecked' : 'checked');
  };
  let dependency =
    userRole === 'commuter' ? userRole : user.is_tracking_allowed;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setUserLocation, dependency]);

  useEffect(() => {
    if (rideJeepney) {
      setRegion({
        latitude: otherUsers[selectedJeep]._data.latitude,
        longitude: otherUsers[selectedJeep]._data.longitude,
        latitudeDelta: 0.008,
        longitudeDelta: 0.008,
      });
    }
  }, [otherUsers, rideJeepney, selectedJeep, setRegion]);
  return (
    <View style={{ height, width }}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        customMapStyle={customMap}
        region={region}
        initialRegion={initialRegion()}>
        {!rideJeepney && userLocation && status === 'checked' && (
          <>
            <Marker coordinate={userLocation} anchor={{ x: 0.5, y: 0.5 }}>
              <View
                style={{
                  height: 70,
                  width: 70,
                  alignItems: 'center',
                  justifyContent: 'center',
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
              </View>
            </Marker>
          </>
        )}
        {!rideJeepney &&
          routeData &&
          otherUsers &&
          showOthers === 'checked' &&
          otherUsers.map(
            // eslint-disable-next-line @typescript-eslint/no-shadow
            (user: any, index: any) =>
              user._data.is_tracking_allowed &&
              filteredJeepneyCodes.includes(user._data.jeepney_code) &&
              filteredJeepneyHeadsigns.includes(user._data.jeepney_headsign) &&
              InGeofenceRadius(
                user._data.latitude,
                user._data.longitude,
                routeData.routes[routeIndex],
              ) === true && (
                <Marker
                  id={index}
                  key={index}
                  coordinate={{
                    latitude: user._data.latitude,
                    longitude: user._data.longitude,
                  }}
                  anchor={{ x: 0.5, y: 0.5 }}
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  onPress={(e: any) => {
                    setSelectedJeep(index);
                    setShowModal(true);
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
                        // transform: [{ rotate: `${user._data.heading}deg` }],
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
                      {/* <View
                        style={{
                          position: 'absolute',
                          top: 0,
                        }}>
                        <Icon source="arrow-up" size={25} color="red" />
                      </View> */}
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
        {selectedJeep && otherUsers && rideJeepney && (
          <Marker
            coordinate={{
              latitude: otherUsers[selectedJeep]._data.latitude,
              longitude: otherUsers[selectedJeep]._data.longitude,
            }}
            anchor={{ x: 0.5, y: 0.5 }}>
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
              </View>
              <View
                style={{
                  position: 'absolute',
                  bottom: 0,
                }}>
                <Text style={{ color: 'white' }}>
                  {otherUsers[selectedJeep]._data.jeepney_code}
                </Text>
              </View>
            </View>
          </Marker>
        )}
        {routeData?.routes && (
          <DynamicPolyline route={routeData.routes[routeIndex]} />
        )}
      </MapView>
      {showModal &&
        selectedJeep &&
        InfoModal(onRideJeepney, onHideModal, otherUsers[selectedJeep]._data)}
      {!rideJeepney && (
        <>
          <ToggleButton
            icon={status === 'checked' ? 'shield-home' : 'shield-home-outline'}
            value="bluetooth"
            status={status}
            onPress={onButtonToggle}
            iconColor="tomato"
            style={styles.toggleButtonA}
            size={40}
          />
          {routeData && (
            <ToggleButton
              icon={showOthers === 'checked' ? 'jeepney' : 'car-off'}
              value="bluetooth"
              status={showOthers}
              onPress={onToggleShowOthers}
              iconColor="tomato"
              style={styles.toggleButtonB}
              size={40}
            />
          )}
        </>
      )}
      {rideJeepney && (
        <Button
          buttonColor="tomato"
          textColor="white"
          style={styles.getOffButton}
          onPress={() => setRideJeepney(false)}>
          Get off
        </Button>
      )}
      {rideJeepney && (
        <View
          style={{
            alignContent: 'center',
            alignItems: 'center',
            width: '100%',
            marginTop: 15,
          }}>
          <View
            style={{
              width: '70%',
              height: 100,
              backgroundColor: '#441877',
              zIndex: 10,
              borderRadius: 20,
              padding: 10,
              alignContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{ color: 'white' }}>
              {`You are riding Jeepney ${otherUsers[selectedJeep]._data.jeepney_code}`}
            </Text>
            <Text
              style={{
                color: 'white',
              }}>{`heading to ${otherUsers[selectedJeep]._data.jeepney_headsign}`}</Text>
            <Text
              style={{
                color: 'white',
              }}>{`with plate number ${otherUsers[selectedJeep]._data.plate_number}`}</Text>
            <Text
              style={{
                color: 'white',
              }}>{`Driver: ${otherUsers[selectedJeep]._data.name}`}</Text>
          </View>
        </View>
      )}
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
    zIndex: 0,
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
  getOffButton: {
    position: 'absolute',
    bottom: 85,
    zIndex: 1,
    right: 0,
    margin: 10,
  },
});
