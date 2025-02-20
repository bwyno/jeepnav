export default function FareCalculator({ step }: any, minFare: any) {
  let distanceKm: number;

  const meterToKm = (meter: number) => {
    return meter / 1000;
  };

  if (step.travelMode === 'TRANSIT') {
    distanceKm = meterToKm(step.distanceMeters);
    if (distanceKm <= 4) {
      return minFare.toFixed(2);
    } else {
      return (Math.floor(distanceKm - 4) * 2.2 + minFare).toFixed(2);
    }
  } else {
    return 0;
  }
}
