import {View} from "react-native";
import CourseDescription from "../components/CourseDescription";
import {useEffect, useState} from "react";
import Server from "../constants/Server";


export default function CourseDetailScreen({navigation, params}) {

    console.log(params);
    return (
        <View>
            <CourseDescription navigation={navigation} params={params}>

            </CourseDescription>
        </View>
    );
}