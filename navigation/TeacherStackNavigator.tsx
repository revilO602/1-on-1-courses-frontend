import {createNativeStackNavigator} from "@react-navigation/native-stack";
import TeacherCoursesScreen from "../screens/TeacherCoursesScreen";
import TeacherCourseDetailScreen from "../screens/TeacherCourseDetailScreen";
import EditCourseScreen from "../screens/EditCourseScreen";
import StudentsScreen from "../screens/StudentsScreen";
import CallScreen from "../screens/CallScreen";
import TeacherMaterialsScreen from "../screens/TeacherMaterialsScreen";


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
          <Stack.Screen name="StudentsScreen" component={StudentsScreen}
                        options={{ title: 'Students' }}/>
          <Stack.Screen name="CallScreen" component={CallScreen}
                        options={{ title: 'Call with student' }}/>
          <Stack.Screen name="TeacherMaterialsScreen" component={TeacherMaterialsScreen}
                        options={{ title: 'Materials' }}/>
        </Stack.Navigator>
    );
}

