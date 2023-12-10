import React, { useContext, useState } from 'react';
import {
  Pressable,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  Keyboard,
} from 'react-native';
import { StyleSheet } from 'react-native';
import { Button, IconButton } from 'react-native-paper';
import { UserContext } from '../../context/User';
import Disclaimer from '../../components/Disclaimer';

export default function Auth({ navigation }: any) {
  const [hasSelected, setHasSelected] = useState<boolean>(false);
  const [name, setName] = useState('');
  const [showSignUp, setShowSignUp] = useState<boolean>(false);
  // const [fare, setFare] = useState('');
  const [jeepneyCode, setJeepneyCode] = useState('');
  const [plateNumber, setPlateNumber] = useState('');
  const [error, setError] = useState('');
  const {
    logIn,
    signUp,
    loginErrorMsg,
    signupErrorMsg,
    setLoginErrorMsg,
    isDisclaimerVisible,
    setIsDisclaimerVisible,
    setUserRole,
  } = useContext(UserContext);

  function createAccount() {
    // if (fare && name && jeepneyCode && plateNumber) {
    if (name && jeepneyCode && plateNumber) {
      setError('');
      signUp(
        name,
        {
          name: name,
          jeepney_code: jeepneyCode,
          plate_number: plateNumber,
          is_active: true,
          // minimum_fare: fare,
        },
        navigation,
      );
    } else {
      setError('Incorrect details!');
    }
  }

  return (
    <View style={styles.authView}>
      <Disclaimer
        isVisible={isDisclaimerVisible}
        onClose={() => setIsDisclaimerVisible(false)}
      />
      <View style={styles.authHeaderView}>
        <Text style={styles.authHeaderText}>JeepNav</Text>
        <Text style={styles.authHeaderContent}>Travel with Ease!</Text>
      </View>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.authContentView}>
          {!hasSelected && !showSignUp && (
            <>
              <Text style={styles.authContentHeader}>Are you a...</Text>
              <View style={styles.authContentSelectionView}>
                <View style={styles.authSelection}>
                  <IconButton
                    icon="account"
                    size={70}
                    iconColor="tomato"
                    onPress={() => {
                      navigation.push('TabNavigator');
                      setUserRole('commuter');
                    }}
                  />
                  <Text style={styles.authSelectionLabel}>COMMUTER</Text>
                </View>
                <View style={styles.authSelection}>
                  <IconButton
                    icon="jeepney"
                    size={70}
                    iconColor="tomato"
                    onPress={() => {
                      setHasSelected(true);
                      setUserRole('driver');
                    }}
                  />
                  <Text style={styles.authSelectionLabel}>DRIVER</Text>
                </View>
              </View>
            </>
          )}
          {hasSelected && !showSignUp && (
            <>
              <View style={styles.signInView}>
                <Text style={styles.signInHeader}>Sign in</Text>
                <View style={styles.formStyle}>
                  <TextInput
                    placeholder="Name"
                    value={name}
                    onChangeText={text => setName(text)}
                    style={styles.logInForm}
                    placeholderTextColor={'white'}
                  />
                  <Button
                    buttonColor="tomato"
                    textColor="white"
                    onPress={() => {
                      logIn(name, navigation);
                    }}>
                    Log In
                  </Button>
                  {loginErrorMsg && (
                    <Text
                      style={
                        styles.signUpErrorText
                      }>{`ERROR: ${loginErrorMsg}`}</Text>
                  )}
                </View>
                <Pressable
                  onPress={() => {
                    setShowSignUp(true);
                    setLoginErrorMsg('');
                  }}>
                  <Text style={styles.textStyles}>
                    Dont have an account? Sign up here.
                  </Text>
                </Pressable>
              </View>
            </>
          )}
          {showSignUp && (
            <>
              <TextInput
                placeholder="Name"
                value={name}
                onChangeText={text => setName(text)}
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
                placeholder="Plate Number"
                value={plateNumber}
                onChangeText={text => setPlateNumber(text)}
                style={styles.logInForm}
                placeholderTextColor={'white'}
              />
              {/* <TextInput
                placeholder="Minimum Fare"
                value={fare}
                onChangeText={value => setFare(value)}
                style={styles.logInForm}
                placeholderTextColor={'white'}
                keyboardType="numeric"
                maxLength={5}
              /> */}
              <Button
                buttonColor="tomato"
                textColor="white"
                onPress={() => {
                  createAccount();
                }}>
                Sign Up
              </Button>
              {error && (
                <Text style={styles.signUpErrorText}>{`ERROR: ${error}`}</Text>
              )}
              {signupErrorMsg && (
                <Text
                  style={
                    styles.signUpErrorText
                  }>{`ERROR: ${signupErrorMsg}`}</Text>
              )}
            </>
          )}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}
const styles = StyleSheet.create({
  authView: {
    width: '100%',
    height: '100%',
    backgroundColor: '#242F3E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  authHeaderView: {
    width: '80%',
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  authHeaderText: {
    color: 'tomato',
    fontSize: 50,
    fontStyle: 'italic',
    fontWeight: '800',
  },
  authHeaderContent: {
    color: 'white',
    fontSize: 15,
    fontStyle: 'italic',
    fontWeight: '800',
  },
  authContentView: {
    height: '60%',
    paddingTop: 50,
    width: '100%',
    alignItems: 'center',
  },
  authContentHeader: {
    color: 'white',
    fontStyle: 'italic',
  },
  authContentSelectionView: {
    flexDirection: 'row',
    paddingTop: 40,
  },
  authSelection: {
    width: '50%',
    alignItems: 'center',
  },
  authSelectionLabel: {
    color: 'white',
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
  textStyles: {
    color: 'white',
    textDecorationLine: 'underline',
  },
  formStyle: {
    alignItems: 'center',
  },
  signInHeader: {
    color: 'white',
    fontSize: 40,
  },
  signInView: {
    gap: 40,
    alignItems: 'center',
  },
  signUpErrorText: {
    color: 'red',
  },
});
