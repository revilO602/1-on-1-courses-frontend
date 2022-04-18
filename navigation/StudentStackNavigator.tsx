import {createNativeStackNavigator} from "@react-navigation/native-stack";
import StudentCoursesScreen from "../screens/StudentCoursesScreen";
import StudentCourseDetailScreen from "../screens/StudentCourseDetailScreen";
import JoinCallScreen from "../screens/JoinCallScreen";


const Stack = createNativeStackNavigator();

export default function StudentStackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="StudentCoursesScreen" component={StudentCoursesScreen}
                          options={{ title: 'My Courses' }}/>
            <Stack.Screen name="StudentCourseDetailScreen" component={StudentCourseDetailScreen}
                          options={{ title: 'Course detail' }}/>
           <Stack.Screen name="JoinCallScreen" component={JoinCallScreen}
                        options={{ title: 'Call with teacher' }}/>
        </Stack.Navigator>
    );
}
