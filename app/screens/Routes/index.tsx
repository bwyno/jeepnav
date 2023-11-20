import React, { useContext } from 'react';
import { ScrollView, View } from 'react-native';
import { Appbar } from 'react-native-paper';

import RoutesList from './RouteList';
import { RouteContext } from '../../context/Route';
import { styles } from '../../style';

export default function Route({ navigation }: any) {
  const {
    setDestination,
    setOrigin,
    setRouteData,
    setOriginMarker,
    setDestinationMarker,
  } = useContext(RouteContext);
  return (
    <>
      <View>
        <Appbar.Header>
          <Appbar.BackAction
            onPress={() => {
              navigation.push('Home');
              setDestination();
              setOrigin();
              setRouteData();
              setOriginMarker();
              setDestinationMarker();
            }}
          />
          <Appbar.Content title="Routes" />
          <Appbar.Action icon="filter-variant" onPress={() => {}} />
          <Appbar.Action icon="magnify" onPress={() => {}} />
        </Appbar.Header>
      </View>
      <ScrollView horizontal={true} style={styles.routeContainer}>
        <RoutesList navigate={navigation} />
      </ScrollView>
    </>
  );
}
