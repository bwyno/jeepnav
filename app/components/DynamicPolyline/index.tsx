import { decode } from '@googlemaps/polyline-codec';
import React from 'react';
import { LatLng, Marker, Polyline } from 'react-native-maps';

import LatLngConvert from '../../helpers/LatLngConvert';
import { Icon } from 'react-native-paper';
import { View } from 'react-native';

export default function DynamicPolyline({ route }: any) {
  const polylines: React.JSX.Element[] = [];
  try {
    if (route) {
      route.legs.forEach((leg: any, legIndex: any) => {
        leg.steps.forEach((step: any, stepIndex: any) => {
          const coords: LatLng[] = LatLngConvert(
            decode(step.polyline.encodedPolyline, 5),
          );
          if (step.travelMode === 'WALK') {
            polylines.push(
              <Polyline
                key={`leg${legIndex}-step${stepIndex}`}
                coordinates={coords}
                strokeColor="red"
                strokeWidth={5}
                lineDashPattern={[1]}
              />,
            );
          } else {
            polylines.push(
              <View key={`leg${legIndex}-step${stepIndex}`}>
                <Marker
                  key={`leg${legIndex}-step${stepIndex}, start`}
                  coordinate={step.startLocation.latLng}>
                  <Icon
                    source="eye-circle-outline"
                    size={25}
                    color="powderblue"
                  />
                </Marker>
                <Polyline
                  key={`leg${legIndex}-step${stepIndex}`}
                  coordinates={coords}
                  strokeColor="tomato"
                  strokeWidth={5}
                />
                <Marker
                  key={`leg${legIndex}-step${stepIndex}, end`}
                  coordinate={step.endLocation.latLng}>
                  <Icon source="eye-circle" size={25} color="powderblue" />
                </Marker>
              </View>,
            );
          }
        });
      });
    }
    return polylines;
  } catch (e) {
    console.log(e);
  }
}
