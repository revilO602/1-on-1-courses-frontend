import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import Colors from "../constants/Colors";
import TimeTableView, { genTimeBlock } from 'react-native-timetable';
import Server from "../constants/Server";




export default function CourseDescription({navigation, course}){

    const [gotTimeslots, setTimeslots] = useState([]);

    useEffect(() => {
        setTimeslots(course.timeslots.map((timeslot: any) => {
            //console.log(timeslot.startTime)
            const time = timeslot.startTime;
            const weekday = timeslot.weekDay.substring(0,3).toUpperCase();
            const endHour = parseInt(time) + 1

            //console.log(weekday);
            return {
                title: `${time.substring(0, 2)} - ${endHour.toString()}`,
                startTime: genTimeBlock(`${weekday.substring(0, 3).toUpperCase()}`, `${parseInt(time.substring(0, 2))}`),
                endTime: genTimeBlock(`${weekday.substring(0, 3).toUpperCase()}`, `${parseInt(time.substring(0, 2)) + 1}`, 50),
            }
        }))
    }, []);


    return (
        <ScrollView contentContainerStyle={{backgroundColor: Colors.background, margin: 5}}>

            <View style={styles.viewStyle}>
                <Text style={styles.titleStyle}>{course.name}</Text>
                <Text style={styles.subtitleStyle}>by {course.teacher.firstName} {course.teacher.lastName}</Text>
            </View>
            <View style={styles.viewStyle}>
                <Text style={styles.descriptionStyle}>Description</Text>
                <Text style={styles.contentStyle}>{course.description}</Text>
            </View>
            <View style={styles.viewStyle}>
                <TimeTableView
                    //scrollViewRef={this.scrollViewRef}
                    events={gotTimeslots}
                    pivotTime={0}
                    //pivotDate={this.pivotDate}
                    numberOfDays={7}
                    //onEventPress={this.onEventPress}
                    //headerStyle={styles.headerStyle}
                    formatDateHeader="dddd"
                    locale="en-US"/>
            </View>


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
    },
    contentStyle: {
        justifyContent: "center",
        margin: 5,
    }
})
