import React, { useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Home from './screen/Home';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Icon } from 'react-native-paper';
import MapSearch from './screen/MapSearch';
import Profile from './screen/Profile';
import Auth from './screen/Auth';
import { SettingsContext } from './context/Settings';
import { Platform } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { UserContext } from './context/User';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigator() {
  const { userRole } = useContext(UserContext);
  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({ focused, color }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused ? 'home-circle' : 'home-circle-outline';
            } else if (route.name === 'Map Search') {
              iconName = focused ? 'map-search' : 'map-search-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'account' : 'account-outline';
            }
            // You can return any component that you like here!
            return <Icon source={iconName} size={35} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
          tabBarStyle: {
            borderTopColor: 'black',
            height: 60,
            backgroundColor: '#441877',
          },
          tabBarHideOnKeyboard: true,
          tabBarShowLabel: false,
        })}
        initialRouteName="Home">
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Map Search" component={MapSearch} />
        {userRole !== 'commuter' && (
          <Tab.Screen name="Profile" component={Profile} />
        )}
      </Tab.Navigator>
    </>
  );
}

function App(): JSX.Element {
  const { fetchAppSettings } = useContext(SettingsContext);

  useEffect(() => {
    setTimeout(() => {
      if (Platform.OS === 'android') {
        SplashScreen.hide();
      }
    }, 5000);

    fetchAppSettings();
  });
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Auth">
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
        <Stack.Screen name="Auth" component={Auth} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
