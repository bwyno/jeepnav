function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  return distance;
}

export default function InGeofenceRadius(
  dataLat: number,
  dataLon: number,
  route: any,
): boolean {
  const radius = 1;
  let isInRadius = false; // Flag to track if any location is within the radius

  route.legs.forEach((leg: any) => {
    leg.steps.forEach((step: any) => {
      if (step.travelMode === 'TRANSIT') {
        const distance = calculateDistance(
          step.startLocation.latLng.latitude,
          step.startLocation.latLng.longitude,
          dataLat,
          dataLon,
        );
        if (distance <= radius) {
          isInRadius = true;
          return; // Exit the loop if a location is within the radius
        }
      }
    });

    if (isInRadius) {
      return; // Exit the loop if a location is within the radius
    }
  });

  return isInRadius;
}
