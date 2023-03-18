import {createNativeStackNavigator} from "@react-navigation/native-stack";
import TestScreen from "../screens/TestScreen";
import CategoriesScreen from "../screens/CategoriesScreen";
import CoursesScreen from "../screens/CoursesScreen";
import CourseDetailScreen from "../screens/CourseDetailScreen";
import CreateCourseScreen from "../screens/CreateCourseScreen";

const Stack = createNativeStackNavigator();

export default function CoursesStackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="CategoriesScreen" component={CategoriesScreen}
                          options={{ title: 'Categories' }}/>
            <Stack.Screen name="CoursesScreen" component={CoursesScreen}
                          options={({ route }) => ({ title: `${route.params.name} courses` })}/>
            <Stack.Screen name="CourseDetailScreen" component={CourseDetailScreen}
                          options={{ title: 'Course detail' }}/>
          <Stack.Screen name="CreateCourseScreen" component={CreateCourseScreen}
                        options={{ title: 'Create course' }}/>
        </Stack.Navigator>
    );
}
