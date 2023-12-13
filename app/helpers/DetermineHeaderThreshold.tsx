export function upperHeaderThreshold(angle: number) {
  const upperThreshold: number = (angle + 50) % 360;

  return upperThreshold;
}

export function lowerHeaderThreshold(angle: number) {
  const lowerThreshold: number = (angle - 50 + 360) % 360;

  return lowerThreshold;
}
