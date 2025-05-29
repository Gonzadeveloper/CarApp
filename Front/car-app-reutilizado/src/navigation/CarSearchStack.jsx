// CarDetailsStack.jsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchByPlate from '../screens/SearchByPlate';
import CarDetailBySearch from '../screens/CarDetailBySearch';

const Stack = createNativeStackNavigator();

export default function CarSearchStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="SearchByPlate" 
        component={SearchByPlate}   
        options={{ headerShown: false }} 
        />
      <Stack.Screen 
        name="CarDetailBySearch" 
        component={CarDetailBySearch}   
        options={{ headerShown: false }}  
        />
    </Stack.Navigator>
  );
}
