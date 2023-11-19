import React, { createContext, useState } from 'react';

import { getRouteData } from '../service/RouteService';
import Destination from '../types/DestinationInterface';
import Origin from '../types/OriginInterface';

export const RouteContext = createContext<any>(null);

export function RouteContextProvider({ children }: any) {
  const [origin, setOrigin] = useState<Origin>();
  const [destination, setDestination] = useState<Destination>();
  const [visible, setVisible] = useState(false);
  const [routeErrorMsg, setRouteErrorMsg] = useState<string>('');
  const [routeData, setRouteData] = useState();
  const [routeIndex, setRouteIndex] = useState();

  /**
   * Get route data.
   */
  const getRoute = async (navigation: any) => {
    try {
      if (origin !== undefined && destination !== undefined) {
        await getRouteData({
          origin: {
            location: {
              latLng: {
                latitude: origin.geometry.location.lat,
                longitude: origin.geometry.location.lng,
              },
            },
          },
          destination: {
            location: {
              latLng: {
                latitude: destination.geometry.location.lat,
                longitude: destination.geometry.location.lng,
              },
            },
          },
          travelMode: 'TRANSIT',
          computeAlternativeRoutes: true,
          routeModifiers: {
            avoidTolls: false,
            avoidHighways: false,
            avoidFerries: false,
          },
          languageCode: 'en-US',
          units: 'IMPERIAL',
        })
          .then(response => {
            setRouteData(response.data);
            navigation.push('Route');
          })
          .catch(error => {
            console.log(error);
          });
      } else if (origin !== undefined && destination === undefined) {
        // Origin is not empty and destination is empty
        setRouteErrorMsg('Destination is invalid');
        setVisible(true);
      } else if (origin === undefined && destination !== undefined) {
        // Origin is empty and destination is not empty
        setRouteErrorMsg('Origin is invalid');
        setVisible(true);
      } else {
        setRouteErrorMsg('Set origin and destination');
        setVisible(true);
      }
    } catch (e) {
      // console.log(e);
    }
  };

  return (
    <RouteContext.Provider
      value={{
        origin,
        setOrigin,
        destination,
        setDestination,
        visible,
        setVisible,
        routeErrorMsg,
        setRouteErrorMsg,
        getRoute,
        routeData,
        setRouteData,
        routeIndex,
        setRouteIndex,
      }}>
      {children}
    </RouteContext.Provider>
  );
}
