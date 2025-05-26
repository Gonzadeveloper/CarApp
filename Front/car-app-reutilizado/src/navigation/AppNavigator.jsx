import React from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';
import CarDetailsScreen from '../screens/CarDetailsScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Drawer = createDrawerNavigator();

export default function AppNavigator() {
    return (
        <Drawer.Navigator initialRouteName="CarDetails">
            <Drawer.Screen name="CarDetails" component={CarDetailsScreen}/>
            <Drawer.Screen name="Settings" component={SettingsScreen}/>
        </Drawer.Navigator>
    );
}