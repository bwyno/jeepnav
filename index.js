/**
 * @format
 */

import * as React from 'react';
import { AppRegistry } from 'react-native';
import App from './app/index';
import { name as appName } from './app.json';
import { PaperProvider } from 'react-native-paper';
import { RouteContextProvider } from './app/context/Route';

export default function Main() {
  return (
    <PaperProvider>
      <RouteContextProvider>
        <App />
      </RouteContextProvider>
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
