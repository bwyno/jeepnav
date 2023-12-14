import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { Button, IconButton, Switch } from 'react-native-paper';
import { UserContext } from '../../context/User';

export default function Profile() {
  const { user, updateData, userRole, updateLocationInDb } =
    useContext(UserContext);
  // const [fare, setFare] = useState(user.fare);
  const [jeepneyCode, setJeepneyCode] = useState('');
  const [jeepneyRoute, setJeepneyRoute] = useState<any>('');
  const [plateNumber, setPlateNumber] = useState('');
  const [allowEdit, setAllowEdit] = useState<boolean>(false);
  const [errorUpdate, setErrorUpdate] = useState('');
  const [allowTracking, setAllowTracking] = useState<boolean>();
  const [jeepneyHeadsign, setJeepneyHeadsign] = useState('');
  const onToggleSwitch = () => setAllowTracking(!allowTracking);

  useEffect(() => {
    if (userRole === 'driver') {
      setJeepneyCode(user.jeepney_code);
      setPlateNumber(user.plate_number);
      setAllowTracking(user.is_tracking_allowed);
      setJeepneyRoute(user.jeepney_route);
      setJeepneyHeadsign(user.jeepney_headsign ? user.jeepney_headsign : '');
      updateLocationInDb(user.is_tracking_allowed);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userRole, user]);

  function updateInformation() {
    // if (jeepneyCode && plateNumber && fare && allowTracking) {
    if (jeepneyCode && plateNumber && jeepneyRoute && jeepneyHeadsign) {
      setErrorUpdate('');
      updateData({
        jeepney_code: jeepneyCode,
        plate_number: plateNumber,
        // minimum_fare: fare,
        is_tracking_allowed: allowTracking,
        jeepney_headsign: jeepneyHeadsign,
      });
      setAllowEdit(false);
    } else {
      setErrorUpdate('Incorrect data!');
    }
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.profileContainer}>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>PROFILE</Text>
              <View style={styles.iconNameContainer}>
                <IconButton
                  icon="account"
                  size={80}
                  iconColor="tomato"
                  mode="outlined"
                />
                {user ? (
                  <>
                    <Text style={styles.nameTextStyle}>{user.name}</Text>
                    <Text style={styles.nameLabel}>Driver</Text>
                  </>
                ) : (
                  <Text style={styles.nameLabel}>Commuter</Text>
                )}
              </View>
            </View>
            <View style={styles.bodyContainer}>
              <View style={styles.bodyHeaderContainer}>
                <Text style={styles.bodyHeaderText}>INFORMATION</Text>
              </View>
              <View style={styles.bodyDetailContainer}>
                {!allowEdit && (
                  <>
                    <View style={styles.detailContainer}>
                      <Text style={styles.detailLabelText}>PLATE NUMBER: </Text>
                      <Text style={styles.detailValueText}>
                        {user.plate_number}
                      </Text>
                    </View>
                    <View style={styles.detailContainer}>
                      <Text style={styles.detailLabelText}>JEEPNEY CODE: </Text>
                      <Text style={styles.detailValueText}>
                        {user.jeepney_code}
                      </Text>
                    </View>
                    <View style={styles.detailContainer}>
                      <Text style={styles.detailLabelText}>
                        JEEPNEY ROUTE:{' '}
                      </Text>
                      <Text style={styles.detailValueText}>
                        {user.jeepney_route}
                      </Text>
                    </View>
                    <View style={styles.detailContainer}>
                      <Text style={styles.detailLabelText}>
                        JEEPNEY HEADSIGN:{' '}
                      </Text>
                      <Text style={styles.detailValueText}>
                        {user.jeepney_headsign ? user.jeepney_headsign : ''}
                      </Text>
                    </View>
                    <View style={styles.detailContainer}>
                      <Text style={styles.detailLabelText}>
                        TRACKING ALLOWED:{' '}
                      </Text>
                      <Text style={styles.detailValueText}>
                        {user.is_tracking_allowed ? 'TRUE' : 'FALSE'}
                      </Text>
                    </View>
                    <Button
                      labelStyle={styles.buttonLabelStyle}
                      textColor="tomato"
                      onPress={() => {
                        setAllowEdit(true);
                      }}>
                      EDIT
                    </Button>
                  </>
                )}
                {allowEdit && (
                  <>
                    <TextInput
                      placeholder="Plate Number"
                      value={plateNumber}
                      onChangeText={text => setPlateNumber(text)}
                      style={styles.logInForm}
                      placeholderTextColor={'white'}
                    />
                    <TextInput
                      placeholder="Jeepney Code"
                      value={jeepneyCode}
                      onChangeText={text => setJeepneyCode(text)}
                      style={styles.logInForm}
                      placeholderTextColor={'white'}
                    />
                    <TextInput
                      placeholder="Jeepney Route"
                      value={jeepneyRoute}
                      onChangeText={value => setJeepneyRoute(value)}
                      style={styles.logInForm}
                      placeholderTextColor={'white'}
                    />
                    <TextInput
                      placeholder="Jeepney Headsign"
                      value={jeepneyHeadsign}
                      onChangeText={value => setJeepneyHeadsign(value)}
                      style={styles.logInForm}
                      placeholderTextColor={'white'}
                    />
                    <View>
                      <Text style={styles.allowTrackingTextStyle}>
                        ALLOW TRACKING
                      </Text>
                      <Switch
                        value={allowTracking}
                        onValueChange={onToggleSwitch}
                      />
                    </View>
                    <Button
                      labelStyle={styles.buttonLabelStyle}
                      textColor="tomato"
                      onPress={() => {
                        updateInformation();
                      }}>
                      SUBMIT
                    </Button>
                    {errorUpdate && (
                      <Text style={styles.errorText}>{errorUpdate}</Text>
                    )}
                  </>
                )}
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    backgroundColor: '#242F3E',
    width: '100%',
    height: '100%',
  },
  container: {
    paddingTop: 30,
    alignItems: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  headerText: {
    color: 'white',
    fontSize: 50,
    fontWeight: '500',
  },
  bodyContainer: {
    width: '100%',
    paddingLeft: 40,
    paddingRight: 40,
    alignContent: 'flex-start',
  },
  iconNameContainer: {
    alignItems: 'center',
  },
  nameTextStyle: {
    color: 'tomato',
    fontSize: 25,
    fontWeight: '700',
  },
  nameLabel: {
    color: 'white',
  },
  detailContainer: {
    flexDirection: 'row',
  },
  detailLabelText: {
    color: 'white',
  },
  detailValueText: {
    color: 'tomato',
  },
  bodyHeaderText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
  bodyHeaderContainer: {
    flexDirection: 'column',
    paddingBottom: 40,
    alignContent: 'center',
  },
  bodyDetailContainer: {
    gap: 5,
  },
  buttonLabelStyle: {
    textDecorationLine: 'underline',
    fontSize: 20,
  },
  logInForm: {
    width: 300,
    borderWidth: 1,
    borderRadius: 25,
    padding: 20,
    margin: 5,
    color: 'white',
    borderColor: 'tomato',
  },
  allowTrackingTextStyle: {
    color: 'white',
    fontSize: 15,
  },
  errorText: {
    color: 'red',
  },
});
