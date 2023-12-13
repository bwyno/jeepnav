import React, { useContext, useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, Modal } from 'react-native';

import { RouteContext } from '../../context/Route';
import { styles } from '../../style';
import { Button, Checkbox, Icon } from 'react-native-paper';
import FareCalculator from '../../helpers/FareCalculator';
import { SettingsContext } from '../../context/Settings';
import { FILTER } from '../../constants';
import { UserContext } from '../../context/User';

const RoutesList = ({ navigate }: any) => {
  const {
    routeData,
    setRouteIndex,
    setRegion,
    setOriginMarker,
    setDestinationMarker,
    isAllChecked,
    setIsAllChecked,
    isFastestChecked,
    setIsFastestChecked,
    isShortestChecked,
    setIsShortestChecked,
    filterRoute,
    fastestRoute,
    shortestRoute,
    getJeepneyCodes,
    setTransitHeading,
  } = useContext(RouteContext);
  const { showETA } = useContext(UserContext);
  const { modernMinFare } = useContext(SettingsContext);
  const [selectedRoute, setSelectedRoute] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);

  // eslint-disable-next-line react/no-unstable-nested-components
  function ExpandableItemsList({ item, index }: any) {
    function secondsToHMS(seconds: number) {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const remainingSeconds = seconds % 60;
      if (hours > 0) {
        const formattedHours = hours.toString().padStart(1, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedSeconds = remainingSeconds.toString().padStart(2, '0');
        return `${formattedHours} hrs, ${formattedMinutes} mins, ${formattedSeconds}s`;
      } else {
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedSeconds = remainingSeconds.toString().padStart(2, '0');
        return `${formattedMinutes} mins, ${formattedSeconds}s`;
      }
    }
    const duration = secondsToHMS(parseInt(item.legs[0].duration, 10));
    return (
      <View key={index}>
        <TouchableOpacity
          onPress={() =>
            setSelectedRoute((prevIndex: any) =>
              prevIndex === index ? null : index,
            )
          }>
          <View style={styles.routeItem}>
            <Text style={styles.title}>Route {index + 1} </Text>
            <Text style={styles.duration}>Duration: {duration} </Text>
            <Text style={styles.duration}>
              Distance:{' '}
              {`${(item.legs[0].distanceMeters / 1000).toFixed(2)} km`}
            </Text>
            {selectedRoute === index && (
              <View style={styles.expandedList}>
                <Text style={styles.duration}>Steps: </Text>
                <FlatList
                  data={item.legs[0].steps}
                  keyExtractor={(step, stepIndex) => stepIndex.toString()}
                  renderItem={({ item: step, index: stepIndex }) => (
                    <View style={styles.stepView}>
                      {step.travelMode === 'TRANSIT' ? (
                        <Icon source="jeepney" size={20} color="white" />
                      ) : (
                        <Icon source="walk" size={20} color="white" />
                      )}
                      <Text style={styles.stepText} key={stepIndex}>
                        {step.travelMode === 'TRANSIT' &&
                        step.transitDetails.transitLine !== undefined
                          ? 'TRANSIT'
                          : 'WALK '}
                      </Text>
                      {step.navigationInstruction && (
                        <Text style={styles.stepInstruction}>
                          {step.travelMode === 'TRANSIT' &&
                            `${step.transitDetails.transitLine.nameShort} - `}
                          {step.navigationInstruction.instructions}
                        </Text>
                      )}
                      {step.travelMode === 'TRANSIT' && (
                        <Text style={styles.stepFare}>
                          {FareCalculator({ step }, modernMinFare)}
                        </Text>
                      )}
                    </View>
                  )}
                />
                <Button
                  icon="map-search"
                  mode="contained"
                  onPress={() => {
                    showETA.current = true;
                    setRouteIndex(index);
                    getJeepneyCodes(index);
                    setRegion({
                      latitude: item.legs[0].startLocation?.latLng?.latitude,
                      longitude: item.legs[0].startLocation?.latLng?.longitude,
                      latitudeDelta: 0.008,
                      longitudeDelta: 0.008,
                    });
                    setOriginMarker({
                      latitude: item.legs[0].startLocation?.latLng?.latitude,
                      longitude: item.legs[0].startLocation?.latLng?.longitude,
                    });
                    setDestinationMarker({
                      latitude: item.legs[0].endLocation?.latLng?.latitude,
                      longitude: item.legs[0].endLocation?.latLng?.longitude,
                    });
                    setTransitHeading(index);
                    navigate.push('TabNavigator');
                  }}>
                  Go to Route
                </Button>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <>
      {routeData ? (
        <>
          <View>
            <Text style={styles.routesHeader}>ROUTES</Text>
            <Button
              icon="filter"
              textColor="white"
              onPress={() => {
                setModalVisible(true);
              }}>
              Filter
            </Button>
          </View>
          <FlatList
            data={
              isShortestChecked
                ? shortestRoute?.routes
                : isFastestChecked
                ? fastestRoute?.routes
                : routeData?.routes
            }
            keyExtractor={(item, index) => index.toString()}
            renderItem={ExpandableItemsList}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{ height: '100%', width: '100%' }}
          />
        </>
      ) : (
        <View style={styles.emptyRouteList}>
          <Text style={styles.emptyRouteListText}>
            Search for routes, enter origin and destination.
          </Text>
        </View>
      )}
      <Modal visible={modalVisible} transparent={true}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>Filters:</Text>
            <View style={styles.items}>
              <View style={styles.filterItem}>
                <Checkbox
                  status={isAllChecked ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setIsAllChecked(!isAllChecked);
                    setIsFastestChecked(false);
                    setIsShortestChecked(false);
                    filterRoute();
                  }}
                  disabled={true}
                />
                <Text>{FILTER.ALL}</Text>
              </View>
              <View style={styles.filterItem}>
                <Checkbox
                  status={isFastestChecked ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setIsFastestChecked(!isFastestChecked);
                    setIsShortestChecked(false);
                    setIsAllChecked(isFastestChecked ? true : false);
                    filterRoute();
                  }}
                />
                <Text>{FILTER.FASTEST}</Text>
              </View>
              <View style={styles.filterItem}>
                <Checkbox
                  status={isShortestChecked ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setIsFastestChecked(false);
                    setIsShortestChecked(!isShortestChecked);
                    setIsAllChecked(isShortestChecked ? true : false);
                    filterRoute();
                  }}
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
    </>
  );
};

export default RoutesList;
