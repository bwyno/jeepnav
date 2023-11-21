import React, { useContext, useState } from 'react';
import { View, FlatList, Text, TouchableOpacity } from 'react-native';

import { RouteContext } from '../../context/Route';
import { styles } from '../../style';
import { Button, Icon } from 'react-native-paper';
import FareCalculator from '../../helpers/FareCalculator';

const RoutesList = ({ navigate }: any) => {
  const {
    routeData,
    setRouteIndex,
    setRegion,
    setOriginMarker,
    setDestinationMarker,
    isFastestChecked,
    isShortestChecked,
    fastestRoute,
    shortestRoute,
  } = useContext(RouteContext);
  const [selectedRoute, setSelectedRoute] = useState<any>(null);

  // eslint-disable-next-line react/no-unstable-nested-components
  function ExpandableItemsList({ item, index }: any) {
    function secondsToHMS(seconds: number) {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const remainingSeconds = seconds % 60;
      const formattedHours = hours.toString().padStart(1, '0');
      const formattedMinutes = minutes.toString().padStart(2, '0');
      const formattedSeconds = remainingSeconds.toString().padStart(2, '0');
      return `${formattedHours} hrs: ${formattedMinutes} mins: ${formattedSeconds}s`;
    }
    const duration = secondsToHMS(parseInt(item.legs[0].duration, 10));
    return (
      <TouchableOpacity onPress={() => setSelectedRoute(index)}>
        <View style={styles.routeItem} key={index}>
          <Text style={styles.title}>Route {index + 1} </Text>
          <Text>Duration: {duration} </Text>
          <Text>
            Distance: {`${(item.legs[0].distanceMeters / 1000).toFixed(2)} km`}
          </Text>
          {selectedRoute === index && (
            <View style={styles.expandedList}>
              <Text>Steps: </Text>
              <FlatList
                data={item.legs[0].steps}
                keyExtractor={(step, stepIndex) => stepIndex.toString()}
                renderItem={({ item: step, index: stepIndex }) => (
                  <View style={styles.stepView}>
                    {step.travelMode === 'TRANSIT' ? (
                      <Icon source="jeepney" size={20} />
                    ) : (
                      <Icon source="walk" size={20} />
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
                        {FareCalculator({ step })}
                      </Text>
                    )}
                  </View>
                )}
              />
              <Button
                icon="map-search"
                mode="contained"
                onPress={() => {
                  setRouteIndex(index);
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
                  navigate.push('Home');
                }}>
                Go to Route
              </Button>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  }
  // console.log(fastestRoute);
  return (
    <View>
      {routeData && (
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
        />
      )}
    </View>
  );
};

export default RoutesList;
