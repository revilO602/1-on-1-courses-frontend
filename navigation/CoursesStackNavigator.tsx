import {createNativeStackNavigator} from "@react-navigation/native-stack";
import TestScreen from "../screens/TestScreen";
import CategoriesScreen from "../screens/CategoriesScreen";

const Stack = createNativeStackNavigator();

export default function CoursesStackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="RegisterScreen" component={CategoriesScreen}
                          options={{ title: 'Courses' }}/>
            <Stack.Screen name="ForgotPasswordScreen" component={TestScreen}
                          options={{ title: 'some courses' }}/>
        </Stack.Navigator>
    );
}