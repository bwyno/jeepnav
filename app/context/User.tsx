import React, { createContext, useContext, useRef, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import Geolocation from '@react-native-community/geolocation';
import { getRouteData } from '../service/RouteService';
import { RouteContext } from './Route';
import calculateInitialBearing from '../helpers/BearingCalculator';

export const UserContext = createContext<any>(null);

export function UserContextProvider({ children }: any) {
  const [user, setUser] = useState<any>();
  const [userRole, setUserRole] = useState();
  const [userLocation, setUserLocation] = useState<any>();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loginErrorMsg, setLoginErrorMsg] = useState('');
  const [signupErrorMsg, setSignupErrorMsg] = useState('');
  const otherUsers = useRef();
  const [isDisclaimerVisible, setIsDisclaimerVisible] = useState(true);
  const [userHeading, setUserHeading] = useState<any>(0);
  const [userSpeed, setUserSpeed] = useState<any>();
  const showETA = useRef(false);
  const { destination } = useContext(RouteContext);
  const [eta, setEta] = useState('');
  const [prevLat, setPrevLat] = useState<any>();
  const [prevLon, setPrevLon] = useState<any>();

  async function logIn(name: any, navigation: any) {
    await firestore()
      .collection('Roles')
      .doc('Driver')
      .collection('Users')
      .doc(name)
      .get()
      .then((DocumentSnapshot: any) => {
        if (DocumentSnapshot.exists) {
          setLoginErrorMsg('');
          setUser(DocumentSnapshot._data);
          navigation.push('TabNavigator');
        } else {
          setLoginErrorMsg("Account doesn't exist");
        }
      });
  }

  async function fetchData() {
    await firestore()
      .collection('Roles')
      .doc('Driver')
      .collection('Users')
      .doc(user.name)
      .get()
      .then((DocumentSnapshot: any) => {
        if (DocumentSnapshot.exists) {
          setUser(DocumentSnapshot._data);
        }
      });
  }

  async function updateData(data: any) {
    await firestore()
      .collection('Roles')
      .doc('Driver')
      .collection('Users')
      .doc(user.name)
      .update(data)
      .then(() => {
        fetchData();
      });
  }

  async function signUp(name: any, data: any, navigation: any) {
    await firestore()
      .collection('Roles')
      .doc('Driver')
      .collection('Users')
      .doc(name)
      .get()
      .then(DocumentSnapshot => {
        if (DocumentSnapshot.exists) {
          setSignupErrorMsg('Account already exists');
        } else {
          setSignupErrorMsg('');
          firestore()
            .collection('Roles')
            .doc('Driver')
            .collection('Users')
            .doc(name)
            .set(data)
            .then(() => {
              logIn(name, navigation);
            });
        }
      });
  }
  async function fetchLocationFromDb() {
    await firestore()
      .collection('Roles')
      .doc('Driver')
      .collection('Users')
      .doc(user.name)
      .get()
      .then((DocumentSnapshot: any) => {
        if (DocumentSnapshot.exists) {
          setPrevLat(DocumentSnapshot._data.latitude);
          setPrevLon(DocumentSnapshot._data.longitude);
        }
      });
  }

  async function updateLocationInDb(isActive: any) {
    try {
      if (isActive) {
        Geolocation.watchPosition(
          data => {
            fetchLocationFromDb();
            const bearing = calculateInitialBearing(
              prevLat,
              prevLon,
              data.coords.latitude,
              data.coords.longitude,
            );
            firestore()
              .collection('Roles')
              .doc('Driver')
              .collection('Users')
              .doc(user.name)
              .update({
                latitude: data.coords.latitude,
                longitude: data.coords.longitude,
                heading: bearing,
                is_active: true,
              });
          },
          error => {
            console.log(error);
          },
          {
            enableHighAccuracy: true,
            interval: 1000,
            fastestInterval: 1000,
            timeout: 1000,
            maximumAge: 0,
            distanceFilter: 5,
          },
        );
      } else {
        firestore()
          .collection('Roles')
          .doc('Driver')
          .collection('Users')
          .doc(user.name)
          .update({
            latitude: 0,
            longitude: 0,
            heading: 0,
            is_active: false,
          });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getETA() {
    await getRouteData({
      origin: {
        location: {
          latLng: {
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
          },
        },
      },
      destination: {
        location: {
          latLng: {
            latitude: destination?.geometry?.location?.lat,
            longitude: destination?.geometry?.location?.lng,
          },
        },
      },
      travelMode: 'TRANSIT',
      computeAlternativeRoutes: true,
      routeModifiers: {
        avoidTolls: false,
        avoidHighways: false,
        avoidFerries: false,
      },
      languageCode: 'en-US',
      units: 'IMPERIAL',
    })
      .then(response => {
        setEta(response.data.routes[0].legs[0].duration);
      })
      .catch(error => {
        console.log(error);
      });
  }

  async function getUserLocation() {
    try {
      Geolocation.watchPosition(
        data => {
          setUserLocation({
            latitude: data.coords.latitude,
            longitude: data.coords.longitude,
          });
          setUserHeading(data.coords.heading);
          setUserSpeed(data.coords.speed);
        },
        error => {
          console.log(error);
        },
        {
          enableHighAccuracy: true,
          interval: 1000,
          fastestInterval: 1000,
          timeout: 1000,
          maximumAge: 0,
          distanceFilter: 5,
        },
      );
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <UserContext.Provider
      value={{
        userRole,
        setUserRole,
        userLocation,
        setUserLocation,
        user,
        setUser,
        otherUsers,
        isAuthenticated,
        setIsAuthenticated,
        logIn,
        loginErrorMsg,
        setLoginErrorMsg,
        signUp,
        signupErrorMsg,
        setSignupErrorMsg,
        fetchData,
        updateData,
        getUserLocation,
        isDisclaimerVisible,
        setIsDisclaimerVisible,
        userHeading,
        setUserHeading,
        updateLocationInDb,
        userSpeed,
        setUserSpeed,
        getETA,
        showETA,
        eta,
        setEta,
      }}>
      {children}
    </UserContext.Provider>
  );
}
