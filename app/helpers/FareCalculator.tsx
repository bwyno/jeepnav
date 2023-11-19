import { Text } from 'react-native';
import React from 'react';

export default function FareCalculator({ step }: any) {
  let distanceKm: number;

  const meterToKm = (meter: number) => {
    return meter / 1000;
  };

  if (step.travelMode === 'TRANSIT') {
    distanceKm = meterToKm(step.distanceMeters);
    if (distanceKm <= 4) {
      return <Text>{(14).toFixed(2)}</Text>;
    } else {
      return <Text>{(Math.floor(distanceKm - 4) * 2.2 + 14).toFixed(2)}</Text>;
    }
  } else {
    return <Text>{'-'}</Text>;
  }
}
