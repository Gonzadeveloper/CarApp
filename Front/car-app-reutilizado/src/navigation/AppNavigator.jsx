import React from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';
import CarForm from '../screens/CarForm';
import SettingsScreen from '../screens/SettingsScreen';
import CarDetailsStack from "../navigation/CarDetailsStack"
import CustomDrawerContent from "../components/CustomDrawerContent";
import CarSearchStack from "./CarSearchStack";
import { Protected } from '../utils/ProtectedRoute';
import LoginScreen from "../screens/LoginScreen";

const Drawer = createDrawerNavigator();

export default function AppNavigator() {
    return (
         <Drawer.Navigator
            initialRouteName="CarSearchStack"
            drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
            <Drawer.Screen
                name="Login"
                component={LoginScreen}
                options={{ drawerItemStyle: { display: 'none' } }}
            />
            <Drawer.Screen name="CarSearchStack" component={CarSearchStack}/>
            <Drawer.Screen name="CarDetailsStack" component={Protected(CarDetailsStack)}/>
            <Drawer.Screen name="AddCar" component={Protected(CarForm)}/>
            <Drawer.Screen name="Settings" component={Protected(SettingsScreen)}/>
        </Drawer.Navigator>
    );
}