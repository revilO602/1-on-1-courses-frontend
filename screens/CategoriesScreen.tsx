import Categories from "../components/Categories";
import {View, Text, StyleSheet} from "react-native";
import Colors from "../constants/Colors";
import SubmitButton from "../components/SubmitButton";

export default function CategoriesScreen({ navigation }) {
    const newCourse = () => {
        navigation.navigate("CreateCourseScreen")
    }
    return (
        <View style={styles.container} >
            <Categories navigation={navigation}/>
            <View style={styles.buttonContainer}>
                <SubmitButton text={"+ Create course"} onPress={newCourse}/>
            </View>
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
    buttonContainer: {
        alignItems: "flex-end",
        marginLeft: "auto",
        marginRight: 15,
        marginBottom: 5
    }
});
