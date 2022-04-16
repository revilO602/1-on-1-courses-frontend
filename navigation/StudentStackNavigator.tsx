import {createNativeStackNavigator} from "@react-navigation/native-stack";
import StudentCoursesScreen from "../screens/StudentCoursesScreen";
import StudentCourseDetailScreen from "../screens/StudentCourseDetailScreen";


const Stack = createNativeStackNavigator();

export default function StudentStackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="StudentCoursesScreen" component={StudentCoursesScreen}
                          options={{ title: 'My Courses' }}/>
            <Stack.Screen name="StudentCourseDetailScreen" component={StudentCourseDetailScreen}
                          options={{ title: 'Course detail' }}/>
        </Stack.Navigator>
    );
}