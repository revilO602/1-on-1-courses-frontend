import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {FontAwesome5} from "@expo/vector-icons";
import Colors from "../constants/Colors";
import * as React from "react";
import {StyleSheet, Text} from "react-native";
import CoursesStackNavigator from "./CoursesStackNavigator";
import TeacherStackNavigator from "./TeacherStackNavigator";
import TimetableScreen from "../screens/TimetableScreen";
import StudentStackNavigator from "./StudentStackNavigator";
import {logOut} from "../store/state";

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {
    return (
        <BottomTab.Navigator
            initialRouteName="Courses"
            screenOptions={{
                unmountOnBlur: true,
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
                    unmountOnBlur: true,
                    headerShown: false,
                    tabBarIcon: ({ color }) => <FontAwesome5 name="chalkboard-teacher" size={24} color={color} />,
                    tabBarLabel: ({color, focused}) =>
                        <Text style={[styles.text, focused ? styles.textfocused : styles.textunfocused]}>Teacher</Text>,
                }}
            />
            <BottomTab.Screen
                name="Student"
                component={StudentStackNavigator}
                options={{
                    unmountOnBlur: true,
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
                    unmountOnBlur: true,
                    headerShown: false,
                    tabBarIcon: ({ color }) => <FontAwesome5 name="calendar-alt" size={24} color={color} />,
                    tabBarLabel: ({color, focused}) =>
                        <Text style={[styles.text, focused ? styles.textfocused : styles.textunfocused]}>Timetable</Text>,
                }}
            />
          <BottomTab.Screen
            name="SignOut"
            component={TimetableScreen}
            listeners={{
              tabPress: e => {
                e.preventDefault();
                logOut()
              }
            }}
            options={{
              tabBarIcon: ({ color }) => <FontAwesome5 name="sign-out-alt" size={24} color={color} />,
              tabBarLabel: ({color, focused}) =>
                <Text style={[styles.text, focused ? styles.textfocused : styles.textunfocused]}>Log out</Text>,
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
