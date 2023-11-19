import axios from 'axios';
import { GOOGLE_API_KEY } from '../constants';

const url = 'https://routes.googleapis.com/directions/v2:computeRoutes';
const apiKey = GOOGLE_API_KEY;

export const getRouteData = (data: any) => {
  return axios.post(`${url}?key=${apiKey}`, data, {
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-FieldMask':
        // "routes.legs.steps.transitDetails,routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline",
        'routes.*',
    },
  });
};
