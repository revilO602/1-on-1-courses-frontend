import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Colors from "../constants/Colors";

export default function CourseDescription({navigation, course}){
    console.log('------------------------------------------')
    console.log(course);
    return (
        <View style={{flexDirection: 'column'}}>
            <Text style={styles.titleStyle}>Name and author</Text>
            <Text style={styles.titleStyle}>Description</Text>
            {/*<Text>{course.description}</Text>*/}

        </View>
    );
}

const styles = StyleSheet.create({
    titleStyle: {
        fontSize: 30,
        color: Colors.text,
        fontWeight: 'bold',
    }
})
