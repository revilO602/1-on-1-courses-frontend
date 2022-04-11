import {View} from "react-native";
import CourseDescription from "../components/CourseDescription";


export default function CourseDetailScreen({navigation, params}) {


    return (
        <View>
            <CourseDescription navigation={navigation} params={params}>

            </CourseDescription>
        </View>
    );
}