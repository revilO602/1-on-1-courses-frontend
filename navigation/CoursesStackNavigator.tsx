import {createNativeStackNavigator} from "@react-navigation/native-stack";
import TestScreen from "../screens/TestScreen";
import CategoriesScreen from "../screens/CategoriesScreen";

const Stack = createNativeStackNavigator();

export default function CoursesStackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="CategoriesScreen" component={CategoriesScreen}
                          options={{ title: 'Categories' }}/>
            {/*<Stack.Screen name="ListCourseScreen" component={ListCourseScreen}*/}
            {/*              options={{ title: 'some courses' }}/>*/}
        </Stack.Navigator>
    );
}