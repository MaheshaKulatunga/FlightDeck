import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import SpotScreen from '../screens/SpotScreen';
import LogbookScreen from '../screens/LogbookScreen';
import AircraftProfileScreen from '../screens/AircraftProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const SpotStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="SpotHome" component={SpotScreen} options={{ title: 'Spot Aircraft' }} />
    <Stack.Screen name="AircraftProfile" component={AircraftProfileScreen} options={{ title: 'Aircraft Profile' }} />
  </Stack.Navigator>
);

const LogStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Logbook" component={LogbookScreen} options={{ title: 'Log Aircraft' }} />
    <Stack.Screen name="AircraftProfile" component={AircraftProfileScreen} options={{ title: 'Aircraft Profile' }} />
  </Stack.Navigator>
);

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Spot"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Spot') iconName = focused ? 'add-circle' : 'add-circle-outline';
          else if (route.name === 'Logbook') iconName = focused ? 'book' : 'book-outline';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Spot" component={SpotStack} options={{ title: 'Spot' }} />
      <Tab.Screen name="Logbook" component={LogStack} options={{ title: 'Logbook' }} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
