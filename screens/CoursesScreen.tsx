import Courses from "../components/Courses";
import {View, Text, StyleSheet} from "react-native";
import Colors from "../constants/Colors";

export default function CoursesScreen({ navigation, route }) {

    return (
        <Courses navigation={navigation} props={route.params}/>
    );
}

