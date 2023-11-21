import React, { useContext, useState } from 'react';
import { ScrollView, Text, View, Modal } from 'react-native';
import { Appbar, Button, Checkbox } from 'react-native-paper';

import RoutesList from './RouteList';
import { RouteContext } from '../../context/Route';
import { styles } from '../../style';
import { FILTER } from '../../constants';

export default function Route({ navigation }: any) {
  const [modalVisible, setModalVisible] = useState(false);
  const {
    setDestination,
    setOrigin,
    setRouteData,
    setOriginMarker,
    setDestinationMarker,
    isAllChecked,
    setIsAllChecked,
    isFastestChecked,
    setIsFastestChecked,
    isShortestChecked,
    setIsShortestChecked,
    filterRoute,
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
          <Modal visible={modalVisible} transparent={true}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text>Filters:</Text>
                <View style={styles.items}>
                  <View style={styles.filterItem}>
                    <Checkbox
                      status={isAllChecked ? 'checked' : 'unchecked'}
                      onPress={() => {
                        filterRoute();
                        setIsAllChecked(!isAllChecked);
                      }}
                      disabled={isFastestChecked || isShortestChecked}
                    />
                    <Text>{FILTER.ALL}</Text>
                  </View>
                  <View style={styles.filterItem}>
                    <Checkbox
                      status={isFastestChecked ? 'checked' : 'unchecked'}
                      onPress={() => {
                        setIsFastestChecked(!isFastestChecked);
                      }}
                      disabled={isShortestChecked || isAllChecked}
                    />
                    <Text>{FILTER.FASTEST}</Text>
                  </View>
                  <View style={styles.filterItem}>
                    <Checkbox
                      status={isShortestChecked ? 'checked' : 'unchecked'}
                      onPress={() => {
                        setIsShortestChecked(!isShortestChecked);
                      }}
                      disabled={isAllChecked || isFastestChecked}
                    />
                    <Text>{FILTER.SHORTEST}</Text>
                  </View>
                </View>
                <Button mode="outlined" onPress={() => setModalVisible(false)}>
                  CLOSE
                </Button>
              </View>
            </View>
          </Modal>
          <Appbar.Content title="Routes" />
          <Appbar.Action
            icon="filter-variant"
            onPress={() => {
              setModalVisible(true);
            }}
          />
          <Appbar.Action icon="magnify" onPress={() => {}} />
        </Appbar.Header>
      </View>
      <ScrollView horizontal={true} style={styles.routeContainer}>
        <RoutesList navigate={navigation} />
      </ScrollView>
    </>
  );
}
