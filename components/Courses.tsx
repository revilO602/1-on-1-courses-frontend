import {View, Text, StyleSheet, TextInput, Button, ScrollView} from "react-native";
import Colors from "../constants/Colors";

export default function Courses() {
    return (
        <View>
            <Text style = {styles.text}>
                Current Courses
            </Text>
            <ScrollView>
                <View style = {styles.listItem}>
                    <Text>A course (will add actual names later)</Text>
                </View>
            </ScrollView>
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
    text: {
        fontSize: 15,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: Colors.text,
    },
    listItem: {
        padding: 10,
        marginVertical: 10,
        backgroundColor: Colors.background,
        borderColor: 'black',
        borderWidth: 1
    }
});