import { View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React from 'react';
import Search from '../../components/Search';
import RoutesList from '../../components/RouteList';
import { styles } from '../../style';

export default function MapSearch({ navigation }: any) {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.mapSearchView}>
        <Search />
        <View style={styles.routeContainer}>
          <RoutesList navigate={navigation} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
