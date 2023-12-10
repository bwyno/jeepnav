/**
 * @format
 */

import * as React from 'react';
import { AppRegistry } from 'react-native';
import App from './app/index';
import { name as appName } from './app.json';
import { PaperProvider } from 'react-native-paper';
import { RouteContextProvider } from './app/context/Route';
import { UserContextProvider } from './app/context/User';

import Geolocation from '@react-native-community/geolocation';
import { SettingContextProvider } from './app/context/Settings';

export default function Main() {
  const config = {
    skipPermissionRequests: false,
    locationProvider: 'auto',
    authorizationLevel: 'always',
  };
  Geolocation.setRNConfiguration(config);
  return (
    <PaperProvider>
      <SettingContextProvider>
        <RouteContextProvider>
          <UserContextProvider>
            <App />
          </UserContextProvider>
        </RouteContextProvider>
      </SettingContextProvider>
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
