export default function ETACalculator(
  lat1: any, // Origin latitude
  lon1: any, // Origin longitude
  lat2: any, // Moving value
  lon2: any, // Moving value
  totalDistance: any, // Total distance of the leg
  currentTime: any, // current time when the read of values are taken
  startTime: any, // start time when this function is called
) {
  // Function that calculates the distance traveled from previous reading to current reading
  const distanceTraveled = () => {
    // Haversine formula to calculate distance between two points on the Earth
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers

    return distance;
  };

  const timeElapsed = (currentTime - startTime) / 1000; // Convert to seconds
  const speed = distanceTraveled() / timeElapsed;

  const toRadians = (angle: number) => {
    return (angle * Math.PI) / 180;
  };

  const calcNetDistanceTraveled = totalDistance - distanceTraveled(); // calculates the total distance traveled

  return calcNetDistanceTraveled / speed;
}
