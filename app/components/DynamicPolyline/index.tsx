import { decode } from '@googlemaps/polyline-codec';
import React from 'react';
import { LatLng, Marker, Polyline } from 'react-native-maps';

import LatLngConvert from '../../helpers/LatLngConvert';

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
              <>
                {/* <Marker coordinate={{}}/> */}
                <Polyline
                  key={`leg${legIndex}-step${stepIndex}`}
                  coordinates={coords}
                  strokeColor="red"
                  strokeWidth={5}
                />
              </>,
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
