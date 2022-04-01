
import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import AuthNavigator from "./AuthNavigator";


export default function Navigation() {
    return (
        <NavigationContainer>
            <AuthNavigator />
        </NavigationContainer>
    );
}
