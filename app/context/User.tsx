import React, { createContext, useRef, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import Geolocation from '@react-native-community/geolocation';

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

  async function updateLocationInDb(isActive: any) {
    try {
      if (isActive) {
        Geolocation.watchPosition(
          async data => {
            await firestore()
              .collection('Roles')
              .doc('Driver')
              .collection('Users')
              .doc(user.name)
              .update({
                latitude: data.coords.latitude,
                longitude: data.coords.longitude,
                heading: data.coords.heading,
                is_active: true,
              });
          },
          error => {
            console.log(error);
          },
          {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 2000,
          },
        );
      } else {
        await firestore()
          .collection('Roles')
          .doc('Driver')
          .collection('Users')
          .doc(user.name)
          .update({
            latitude: 0,
            longitude: 0,
            heading: 0,
            is_tracking_allowed: false,
            is_active: false,
          });
      }
    } catch (error) {
      console.log(error);
    }
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

          if (userRole === 'driver') {
            if (user.is_tracking_allowed) {
              firestore()
                .collection('Roles')
                .doc('Driver')
                .collection('Users')
                .doc(user.name)
                .update({
                  latitude: data.coords.latitude,
                  longitude: data.coords.longitude,
                  heading: data.coords.heading,
                  is_active: true,
                });
            }
          }
        },
        error => {
          console.log(error);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: 2000,
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
      }}>
      {children}
    </UserContext.Provider>
  );
}
