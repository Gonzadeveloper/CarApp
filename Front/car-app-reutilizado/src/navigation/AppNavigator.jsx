import React from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';
import CarForm from '../screens/CarForm';
import SettingsScreen from '../screens/SettingsScreen';
import CarDetailsStack from "../navigation/CarDetailsStack"
import CustomDrawerContent from "../components/CustomDrawerContent";
import CarSearchStack from "./CarSearchStack";
import { Protected } from '../utils/ProtectedRoute';
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen"

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
            <Drawer.Screen 
                name="CarSearchStack" 
                component={CarSearchStack}
                options={{ title:"Busqueda por patente"}}
                />
            <Drawer.Screen 
                name="CarDetailsStack" 
                component={Protected(CarDetailsStack)}
                options={{title: "Detalles de mis autos"}}
                />
            <Drawer.Screen 
                name="AddCar" 
                component={Protected(CarForm)}
                options={{title: "Agregar auto"}}
                />
            <Drawer.Screen 
                name="Settings" 
                component={Protected(SettingsScreen)}
                options={{title: "Configuración"}}
                />
            <Drawer.Screen
                name="Register"
                component={RegisterScreen}
                options={{title: "Crear usuario"}}
                />
        </Drawer.Navigator>
    );
}