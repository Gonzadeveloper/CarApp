// CarDetailsStack.jsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CarDetails from '../screens/CarDetailsScreen';
import AddKmScreen from '../screens/AddKmScreen';
import AddServiceScreen from '../screens/AddServiceScreen';

const Stack = createNativeStackNavigator();

export default function CarDetailsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="CarDetailsMain" 
        component={CarDetails}   
        options={{ headerShown: false }} 
        />
      <Stack.Screen 
        name="AddKm" 
        component={AddKmScreen}   
        options={{ headerShown: false }}  
        />
      <Stack.Screen 
        name="AddService" 
        component={AddServiceScreen} 
        options={{ headerShown: false }}
        />
    </Stack.Navigator>
  );
}
