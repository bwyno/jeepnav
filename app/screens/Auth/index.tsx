import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { Button } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import { UserContext } from '../../context/User';
import { ROLE } from '../../constants';
import { styles } from '../../style';
import { RouteContext } from '../../context/Route';

export default function Auth({ navigation }: any) {
  const { setUserRole, setUser } = useContext(UserContext);
  const { routeData, setRouteData } = useContext(RouteContext);
  const [isDriver, setIsDriver] = useState<boolean>(false);
  const [name, setName] = useState('');
  const [jeepneyCode, setJeepneyCode] = useState('');
  const [error, setError] = useState<any>();

  useEffect(() => {
    if (routeData) {
      setRouteData();
    }
  }, [routeData, setRouteData]);

  async function logIn() {
    setUser(name);
    firestore()
      .collection('Roles')
      .doc('Driver')
      .collection('Users')
      .doc(name)
      .get()
      .then(documentSnapshot => {
        console.log('User exists: ', documentSnapshot.exists);

        if (documentSnapshot.exists) {
          console.log('User data: ', documentSnapshot.data());
          navigation.push('Home');
        } else {
          if (name && jeepneyCode) {
            firestore()
              .collection('Roles')
              .doc('Driver')
              .collection('Users')
              .doc(name)
              .set({
                jeepney_code: jeepneyCode,
                longitude: 0,
                latitude: 0,
                isActive: false,
              })
              .then(() => {
                console.log('User added!');
                navigation.push('Home');
              });
          } else {
            setError('Enter details!');
          }
        }
      });
  }

  return (
    <View style={styles.screenView}>
      <View style={styles.bannerView}>
        <Text style={styles.welcomeText}>JEEPNAV</Text>
      </View>
      {!isDriver && (
        <View style={styles.loginView}>
          <Text style={styles.loginHeader}>Are you a...</Text>
          <Button
            onPress={() => {
              setIsDriver(true);
              setUserRole(ROLE.DRIVER);
            }}>
            Driver
          </Button>
          <Button
            onPress={() => {
              setUserRole(ROLE.COMMUTER);
              navigation.push('Home');
            }}>
            Commuter
          </Button>
        </View>
      )}
      {isDriver && (
        <View style={styles.loginView}>
          <Text style={styles.loginHeader}>Enter Details</Text>
          {error && <Text style={styles.errorMsgAuth}>{error}</Text>}
          <TextInput
            placeholder="Name"
            value={name}
            onChangeText={text => setName(text)}
            style={styles.logInForm}
          />
          <TextInput
            placeholder="Jeepney Code"
            value={jeepneyCode}
            onChangeText={text => setJeepneyCode(text)}
            style={styles.logInForm}
          />
          <Button onPress={() => logIn()}>Enter</Button>
        </View>
      )}
    </View>
  );
}
