import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {signedIn} from "../store/state";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import * as React from "react";
import BottomTabNavigator from "./BottomTabNavigator";
import CoursesStackNavigator from "./CoursesStackNavigator";
import TestScreen from "../screens/TestScreen";
import { useState } from '@hookstate/core';

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
    const isSignedIn = useState(signedIn)
    return (
        <Stack.Navigator>
            {isSignedIn.get() ? (
                <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} options={{
                    headerShown: false
                }} />
            ) : (
                <>
                    {/*<Stack.Screen name="RegisterScreen" component={RegisterScreen}*/}
                    {/*              options={{*/}
                    {/*                  headerShown: false*/}
                    {/*              }}/>*/}
                    <Stack.Screen name="LoginScreen" component={LoginScreen}
                                  options={{
                                      headerShown: false
                                  }}/>
                    <Stack.Screen name="RegisterScreen" component={RegisterScreen}
                                  options={{
                                      headerShown: false
                                  }}/>
                </>
            )}
        </Stack.Navigator>
    );
}
