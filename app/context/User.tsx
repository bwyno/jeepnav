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
          console.log(DocumentSnapshot);
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
          console.log(DocumentSnapshot);
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

  async function getUserLocation() {
    try {
      Geolocation.watchPosition(
        data => {
          setUserLocation({
            latitude: data.coords.latitude,
            longitude: data.coords.longitude,
          });
          console.log(data);
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
      }}>
      {children}
    </UserContext.Provider>
  );
}
