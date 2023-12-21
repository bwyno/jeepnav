import { View, StyleSheet, Text } from 'react-native';
import React from 'react';
import { Button } from 'react-native-paper';

export default function InfoModal(
  onRideJeepney: any,
  onHideModal: any,
  selectedJeep: any,
) {
  return (
    <View style={styles.modal}>
      <View style={styles.container}>
        <Text
          style={styles.textStyle}>{`Driver Name: ${selectedJeep.name}`}</Text>
        <Text
          style={styles.textStyle}>{`Code: ${selectedJeep.jeepney_code}`}</Text>
        <Text
          style={
            styles.textStyle
          }>{`Plate Number: ${selectedJeep.plate_number}`}</Text>
        <Text
          style={
            styles.textStyle
          }>{`Route: ${selectedJeep.jeepney_route}`}</Text>
        <Text
          style={
            styles.textStyle
          }>{`Headsign: ${selectedJeep.jeepney_headsign}`}</Text>
        <View style={styles.buttonContainer}>
          <Button
            icon="jeepney"
            onPress={() => onRideJeepney()}
            buttonColor="tomato"
            textColor="white"
            style={styles.buttonStyle}>
            Ride Jeepney
          </Button>
          <Button
            icon="close-circle"
            onPress={() => onHideModal()}
            buttonColor="tomato"
            textColor="white"
            style={styles.buttonStyle}>
            Close
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modal: {
    width: '100%',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  container: {
    width: '90%',
    height: 165,
    backgroundColor: '#441877',
    zIndex: 10,
    borderRadius: 20,
    padding: 10,
  },
  textStyle: {
    color: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  buttonStyle: {
    width: ' 50%',
  },
});
