import Courses from "../components/Courses";
import {View, Text, StyleSheet} from "react-native";
import Colors from "../constants/Colors";

export default function CoursesScreen({ navigation, route }) {
    return (
        <View style={styles.container} >
            <Courses navigation={navigation} props={route.params}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.background
    },
});