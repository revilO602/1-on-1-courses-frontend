import {View} from "react-native";
import CourseDescription from "../components/CourseDescription";
import {useEffect, useState} from "react";
import Server from "../constants/Server";
import Course from "../components/Course";


export default function CourseDetailScreen({navigation, route}) {

    //console.log(route.params);
    return (
        <View>
            <CourseDescription navigation={navigation} route={route.params}>

            </CourseDescription>
        </View>
    );
}