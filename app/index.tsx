import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Home from './screens/Home/home';

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Home />
    </NavigationContainer>
  );
}

export default App;
