import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Colors from "../constants/Colors";

export default function CourseDescription({navigation, route}){
    // console.log('------------------------------------------')
    // console.log(route.course.id);
    console.log('pussy');
    return (
        <View style={styles.container}>
            <Text style={styles.titleStyle}>{route.course.name}</Text>
            <Text style={styles.subtitleStyle}>by {route.course.teacher.firstName} {route.course.teacher.lastName}</Text>
            {/*<Text>{course.description}</Text>*/}

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
    }
})
