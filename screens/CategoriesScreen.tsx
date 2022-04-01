import Categories from "../components/Categories";
import {View, Text, StyleSheet} from "react-native";
import Colors from "../constants/Colors";

export default function CategoriesScreen() {
    return (
        <View style={styles.container} >
            <Categories/>
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