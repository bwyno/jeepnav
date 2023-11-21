import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Home from './screens/Home/index';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Route from './screens/Routes';
import Auth from './screens/Auth';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Auth">
        <Stack.Screen name="Auth" component={Auth} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Route" component={Route} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
