
import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import BottomTabNavigator from "./BottomTabNavigator";


export default function Navigation() {
    return (
        <NavigationContainer>
            <BottomTabNavigator />
        </NavigationContainer>
    );
}
