import React, { useContext } from 'react';
import { View } from 'react-native';
import { Appbar } from 'react-native-paper';

import RoutesList from './RouteList';
import { RouteContext } from '../../context/Route';

export default function Route({ navigation }: any) {
  const { setDestination, setOrigin, setRouteData } = useContext(RouteContext);
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
            }}
          />
          <Appbar.Content title="Routes" />
          <Appbar.Action icon="calendar" onPress={() => {}} />
          <Appbar.Action icon="magnify" onPress={() => {}} />
        </Appbar.Header>
        <RoutesList navigate={navigation} />
      </View>
    </>
  );
}
