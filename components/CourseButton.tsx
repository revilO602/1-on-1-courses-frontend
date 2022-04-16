import {
    View,
    Text,
    StyleSheet,
    Pressable
} from "react-native";
import Colors from "../constants/Colors";
import React from "react";

export default function CourseButton({ navigation, course, nextScreen }) {
    const onPress = () => {
        navigation.navigate(nextScreen, { courseId: course.id })
    }
    return (
            <Pressable style={({ pressed }) => [
                {
                    backgroundColor: pressed ? Colors.tabIconSelected : Colors.primary,
                },
                styles.button,
            ]}
                       onPress={onPress}>
                <View style={styles.viewStyle}>
                    <Text style={styles.titleStyle}>{course.name}</Text>
                    <Text style={styles.subtitleStyle}>by {course.teacher.firstName} {course.teacher.lastName}</Text>
                </View>

            </Pressable>
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
        color: Colors.text
    },
    button: {
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        elevation: 3,
        minWidth: 320,
        minHeight: 50,
    },
    titleStyle: {
        fontSize: 25,
        color: Colors.text,
        fontWeight: 'bold',
        margin: 5,
    },
    subtitleStyle: {
        fontSize: 15,
        color: Colors.text,
        fontWeight: 'bold',
        margin: 5,
    },
    viewStyle: {
        margin: 5,
        width: "100%"
    }
});
