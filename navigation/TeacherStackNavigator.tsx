import {createNativeStackNavigator} from "@react-navigation/native-stack";
import TestScreen from "../screens/TestScreen";
import CategoriesScreen from "../screens/CategoriesScreen";
import CoursesScreen from "../screens/CoursesScreen";
import CourseDetailScreen from "../screens/CourseDetailScreen";
import CreateCourseScreen from "../screens/CreateCourseScreen";
import MyCoursesScreen from "../screens/MyCoursesScreen";


const Stack = createNativeStackNavigator();

export default function TeacherStackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="MyCoursesScreen" component={MyCoursesScreen}
                          options={{ title: 'My Courses' }}/>

        </Stack.Navigator>
    );
}

