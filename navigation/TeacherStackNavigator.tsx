import {createNativeStackNavigator} from "@react-navigation/native-stack";
import TeacherCoursesScreen from "../screens/TeacherCoursesScreen";
import TeacherCourseDetailScreen from "../screens/TeacherCourseDetailScreen";
import EditCourseScreen from "../screens/EditCourseScreen";


const Stack = createNativeStackNavigator();

export default function TeacherStackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="TeacherCoursesScreen" component={TeacherCoursesScreen}
                          options={{ title: 'My Courses' }}/>
          <Stack.Screen name="TeacherCourseDetailScreen" component={TeacherCourseDetailScreen}
                        options={{ title: 'Course detail' }}/>
          <Stack.Screen name="EditCourseScreen" component={EditCourseScreen}
                        options={{ title: 'Edit course' }}/>
        </Stack.Navigator>
    );
}

