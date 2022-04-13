import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Colors from "../constants/Colors";

export default function CourseDescription({navigation, route}){
    // console.log('------------------------------------------')
    // console.log(route.course.id);
    return (
        <View style={styles.container}>
            <View style={styles.viewStyle}>
                <Text style={styles.titleStyle}>{route.course.name}</Text>
                <Text style={styles.subtitleStyle}>by {route.course.teacher.firstName} {route.course.teacher.lastName}</Text>
            </View>
            <View style={styles.viewStyle}>
                <Text style={styles.descriptionStyle}>Description</Text>
                <Text>{route.course.description}</Text>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    titleStyle: {
        fontSize: 30,
        color: Colors.text,
        fontWeight: 'bold',
    },
    subtitleStyle: {
        fontSize: 15,
        color: Colors.text,
        fontWeight: 'bold',
    },
    container: {
        // flex: 1,
        margin: 5,
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: Colors.background,
        flexDirection: 'column',
    },
    descriptionStyle: {
        fontSize: 22,
        color: Colors.text,
        fontWeight: 'bold',
    },
    viewStyle: {
        marginBottom: 5,
        marginTop: 5,
        backgroundColor: Colors.primary,
        borderRadius: 4,
    }
})
