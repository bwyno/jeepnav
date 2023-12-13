import React, { createContext, useState } from 'react';

import { getRouteData } from '../service/RouteService';
import Destination from '../types/DestinationInterface';
import Origin from '../types/OriginInterface';
import { decode } from '@googlemaps/polyline-codec';
import LatLngConvert from '../helpers/LatLngConvert';
import calculateInitialBearing from '../helpers/BearingCalculator';
import { LatLng } from 'react-native-maps';
import {
  upperHeaderThreshold,
  lowerHeaderThreshold,
} from '../helpers/DetermineHeaderThreshold';

export const RouteContext = createContext<any>(null);

export function RouteContextProvider({ children }: any) {
  const [origin, setOrigin] = useState<Origin>();
  const [destination, setDestination] = useState<Destination>();
  const [visible, setVisible] = useState(false);
  const [routeErrorMsg, setRouteErrorMsg] = useState<string>('');
  const [routeData, setRouteData] = useState<any>();
  const [routeIndex, setRouteIndex] = useState<any>();
  const [region, setRegion] = useState();
  const [originMarker, setOriginMarker] = useState();
  const [destinationMarker, setDestinationMarker] = useState();
  const [isAllChecked, setIsAllChecked] = useState(true);
  const [isFastestChecked, setIsFastestChecked] = useState();
  const [isShortestChecked, setIsShortestChecked] = useState();
  const [fastestRoute, setFastestRoute] = useState<any>();
  const [shortestRoute, setShortestRoute] = useState<any>();
  const [filteredJeepneyCodes, setFilteredJeepneyCodes] = useState<any[]>();
  const [upperHeadingThreshold, setUpperHeadingThreshold] = useState<any>();
  const [lowerHeadingThreshold, setLowerHeadingThreshold] = useState<any>();

  /**
   * Get route data.
   */
  const getRoute = async () => {
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
      console.log(e);
    }
  };

  function getJeepneyCodes(index: any) {
    let jeepneyCodes: any = [];
    if (routeData) {
      routeData.routes[index].legs[0].steps.map((step: any) => {
        if (step.travelMode === 'TRANSIT') {
          jeepneyCodes.push(step.transitDetails.transitLine.nameShort);
        }
      });
      setFilteredJeepneyCodes(jeepneyCodes);
    }
  }

  function filterRoute() {
    if (routeData) {
      const routeFilteredA = [];
      routeFilteredA.push(
        routeData.routes.reduce((shortest: any, current: any) => {
          const currentDistance = current.legs[0].distanceMeters;
          const shortestDistance = shortest.legs[0].distanceMeters;
          return currentDistance < shortestDistance ? current : shortest;
        }),
      );
      setShortestRoute({ routes: routeFilteredA });

      const routeFilteredB = [];
      const getSecondsFromDurationString = (durationString: any) => {
        const seconds = parseInt(durationString, 10); // Extract the number part
        return !isNaN(seconds) ? seconds : 0; // Return 0 if parsing fails
      };

      // Find the fastest route
      routeFilteredB.push(
        routeData.routes.reduce((fastest: any, current: any) => {
          const currentDuration = getSecondsFromDurationString(
            current.legs[0].duration,
          );
          const fastestDuration = getSecondsFromDurationString(
            fastest.legs[0].duration,
          );
          return currentDuration < fastestDuration ? current : fastest;
        }),
      );
      setFastestRoute({ routes: routeFilteredB });
    }
  }

  function setTransitHeading(index: any) {
    console.log(routeData);
    if (routeData) {
      routeData.routes[index].legs[0].steps.map((step: any) => {
        if (step.travelMode === 'TRANSIT') {
          const coords: LatLng[] = LatLngConvert(
            decode(step.polyline.encodedPolyline, 5),
          );
          const bearing = calculateInitialBearing(
            coords[0].latitude,
            coords[0].longitude,
            coords[2].latitude,
            coords[2].longitude,
          );
          setHeadingThreshold(bearing);
          console.log(bearing);
        }
      });
    }
  }

  function setHeadingThreshold(angle: any) {
    const lowerThreshold = lowerHeaderThreshold(angle);
    const upperThreshold = upperHeaderThreshold(angle);
    setUpperHeadingThreshold(upperThreshold);
    setLowerHeadingThreshold(lowerThreshold);
    console.log(lowerThreshold);
    console.log(upperThreshold);
  }

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
        region,
        setRegion,
        originMarker,
        setOriginMarker,
        destinationMarker,
        setDestinationMarker,
        filterRoute,
        isAllChecked,
        setIsAllChecked,
        isFastestChecked,
        setIsFastestChecked,
        isShortestChecked,
        setIsShortestChecked,
        fastestRoute,
        setFastestRoute,
        shortestRoute,
        setShortestRoute,
        getJeepneyCodes,
        filteredJeepneyCodes,
        setFilteredJeepneyCodes,
        setTransitHeading,
        upperHeadingThreshold,
        lowerHeadingThreshold,
      }}>
      {children}
    </RouteContext.Provider>
  );
}
