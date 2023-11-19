import { LatLng } from 'react-native-maps';

/**
 * Function for converting decoded polyline to LatLng[]
 * @param array
 * @returns
 */
export default function LatLngConvert(array: any[]) {
  const latLngArray: LatLng[] = [];

  array.map((item: any[]) => {
    const latLangObject: LatLng = {
      latitude: item[0],
      longitude: item[1],
    };
    latLngArray.push(latLangObject);
  });

  return latLngArray;
}
