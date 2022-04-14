import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {FontAwesome5} from "@expo/vector-icons";
import Colors from "../constants/Colors";
import * as React from "react";
import TestScreen from "../screens/TestScreen";
import {StyleSheet, Text} from "react-native";
import CoursesStackNavigator from "./CoursesStackNavigator";
import TeacherStackNavigator from "./TeacherStackNavigator";
import TimetableScreen from "../screens/TimetableScreen";

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {
    return (
        <BottomTab.Navigator
            initialRouteName="Courses"
            backBehavior='history'
            screenOptions={{
                tabBarActiveTintColor: Colors.tabIconSelected, tabBarInactiveTintColor: Colors.tabIconDefault,
                tabBarStyle: {
                    paddingVertical: 3,
                }
            }}>
            <BottomTab.Screen
                name="Courses"
                component={CoursesStackNavigator}
                options={({ navigation }) => ({
                    headerShown: false,
                    tabBarIcon: ({color}) => <FontAwesome5 name="graduation-cap" size={24} color={color} />,
                    tabBarLabel: ({color, focused}) =>
                        <Text style={[styles.text, focused ? styles.textfocused : styles.textunfocused]}>Courses</Text>,
                })}
            />
            <BottomTab.Screen
                name="Teacher"
                component={TeacherStackNavigator}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => <FontAwesome5 name="chalkboard-teacher" size={24} color={color} />,
                    tabBarLabel: ({color, focused}) =>
                        <Text style={[styles.text, focused ? styles.textfocused : styles.textunfocused]}>Teacher</Text>,
                }}
            />
            <BottomTab.Screen
                name="Student"
                component={TestScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => <FontAwesome5 name="user-graduate" size={24} color={color} />,
                    tabBarLabel: ({color, focused}) =>
                        <Text style={[styles.text, focused ? styles.textfocused : styles.textunfocused]}>Student</Text>,
                }}
            />
            <BottomTab.Screen
                name="Timetable"
                component={TimetableScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => <FontAwesome5 name="calendar-alt" size={24} color={color} />,
                    tabBarLabel: ({color, focused}) =>
                        <Text style={[styles.text, focused ? styles.textfocused : styles.textunfocused]}>Timetable</Text>,
                }}
            />
        </BottomTab.Navigator>
    );
}

const styles = StyleSheet.create({
    text: {
    },
    textfocused: {
        color: Colors.text,
    },
    textunfocused: {
        color: Colors.tabIconDefault,
    },
});