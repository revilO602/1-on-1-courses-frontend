import React from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import Colors from "../constants/Colors";
import TimeTableView, { genTimeBlock } from 'react-native-timetable';


const events_data = [
    {
        title: "Math",
        startTime: genTimeBlock("MON", 9),
        endTime: genTimeBlock("MON", 10, 50),
        location: "Classroom 403",
        extra_descriptions: ["Kim", "Lee"],
    },
    {
        title: "Math",
        startTime: genTimeBlock("WED", 9),
        endTime: genTimeBlock("WED", 10, 50),
        location: "Classroom 403",
        extra_descriptions: ["Kim", "Lee"],
    },
    {
        title: "Physics",
        startTime: genTimeBlock("MON", 11),
        endTime: genTimeBlock("MON", 11, 50),
        location: "Lab 404",
        extra_descriptions: ["Einstein"],
    }
];

export default function CourseDescription({navigation, route}){
    // console.log('------------------------------------------')
    // console.log(route.course.id);
    return (
        <ScrollView contentContainerStyle={{backgroundColor: Colors.background, margin: 5}}>
            {/*<View style={styles.container}>*/}
                <View style={styles.viewStyle}>
                    <Text style={styles.titleStyle}>{route.course.name}</Text>
                    <Text style={styles.subtitleStyle}>by {route.course.teacher.firstName} {route.course.teacher.lastName}</Text>
                </View>
                <View style={styles.viewStyle}>
                    <Text style={styles.descriptionStyle}>Description</Text>
                    <Text style={{margin: 5}}>{route.course.description}</Text>
                </View>
                <View style={styles.viewStyle}>
                    <TimeTableView
                        //scrollViewRef={this.scrollViewRef}
                        events={events_data}
                        pivotTime={9}
                        //pivotDate={this.pivotDate}
                        numberOfDays={7}
                        //onEventPress={this.onEventPress}
                        //headerStyle={styles.headerStyle}
                        formatDateHeader="dddd"
                        locale="en-US"/>
                </View>

            {/*</View>*/}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
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
        margin: 5,
    },
    viewStyle: {
        marginBottom: 5,
        marginTop: 5,
        backgroundColor: Colors.primary,
        borderRadius: 4,
    }
})
