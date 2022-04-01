import {createNativeStackNavigator} from "@react-navigation/native-stack";
//import {useState} from "@hookstate/core";
//import {signedIn} from "../store/states";
//import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import * as React from "react";
import BottomTabNavigator from "./BottomTabNavigator";
import TestScreen from "../screens/TestScreen";

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
    const isSignedIn = false
    return (
        <Stack.Navigator>
            {isSignedIn ? (
                <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} options={{
                    headerShown: false
                }} />
            ) : (
                <>
                    <Stack.Screen name="RegisterScreen" component={RegisterScreen}
                                  options={{
                                      headerShown: false
                                  }}/>
                    <Stack.Screen name="LoginScreen" component={TestScreen}
                                  options={{
                                      headerShown: false
                                  }}/>
                </>
            )}
        </Stack.Navigator>
    );
}