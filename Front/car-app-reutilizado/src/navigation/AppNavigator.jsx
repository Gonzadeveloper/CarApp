import React from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';
import CarForm from '../screens/CarForm';
import SettingsScreen from '../screens/SettingsScreen';
import CarDetailsStack from "../navigation/CarDetailsStack"

const Drawer = createDrawerNavigator();

export default function AppNavigator() {
    return (
        <Drawer.Navigator initialRouteName="CarDetailsStack">
            <Drawer.Screen name="CarDetailsStack" component={CarDetailsStack}/>
            <Drawer.Screen name="AddCar" component={CarForm}/>
            <Drawer.Screen name="Settings" component={SettingsScreen}/>
        </Drawer.Navigator>
    );
}