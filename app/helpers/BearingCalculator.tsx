export default function calculateInitialBearing(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
) {
  const phi1 = (lat1 * Math.PI) / 180;
  const phi2 = (lat2 * Math.PI) / 180;
  const deltaLambda = ((lon2 - lon1) * Math.PI) / 180;

  const y = Math.sin(deltaLambda) * Math.cos(phi2);
  const x =
    Math.cos(phi1) * Math.sin(phi2) -
    Math.sin(phi1) * Math.cos(phi2) * Math.cos(deltaLambda);

  const bearing = Math.atan2(y, x);

  // Convert bearing from radians to degrees
  const bearingDegrees = (bearing * 180) / Math.PI;

  return (bearingDegrees + 360) % 360; // Ensure the result is between 0 and 360 degrees
}
