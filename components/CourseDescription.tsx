import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import Colors from "../constants/Colors";
import {WEEK_DAYS} from "../constants/Weekdays";
import TimeTableView, { genTimeBlock } from 'react-native-timetable';

export default function CourseDescription({navigation, course, onEventPress=null}){
    const [events, setEvents] = useState([]);

    const createEvents = () =>{
        setEvents(course.timeslots.map((timeslot: any) => {
            const startTime = timeslot.startTime.split(':');
            const startHour = parseInt(startTime[0])
            const startMinute = parseInt(startTime[1])
            const startDayShort = timeslot.weekDay.substring(0,3).toUpperCase();
            let endHour
            let endDayShort
            if (startHour === 23){
                endHour = 0
                if(startDayShort === "SUN"){
                    endDayShort=WEEK_DAYS[0].short
                }
                else {
                    endDayShort = WEEK_DAYS[WEEK_DAYS.findIndex(day => day.short === startDayShort)+1].short
                }
            }
            else{
                endHour = startHour + 1
                endDayShort = startDayShort
            }
            return {
                title: `${startHour.toString()}:${startMinute.toString().padStart(2, '0')} - ${endHour.toString()}:${startMinute.toString().padStart(2, '0')}`,
                startTime: genTimeBlock(startDayShort, startHour, startMinute),
                endTime:  genTimeBlock(endDayShort, endHour, startMinute),
                timeslot: timeslot
            }
        }))
    }

    useEffect( () =>{
        createEvents()
    },[])

    return (
        <View style={{backgroundColor: Colors.background, margin: 5}}>
            <View style={styles.viewStyle}>
                <Text style={styles.titleStyle}>{course.name}</Text>
                <Text style={styles.subtitleStyle}>by {course.teacher.firstName} {course.teacher.lastName}</Text>
            </View>
            <View style={styles.viewStyle}>
                <Text style={styles.descriptionStyle}>Description</Text>
                <Text style={styles.contentStyle}>{course.description}</Text>
            </View>
            <View style={styles.viewStyle}>
                <Text style={styles.descriptionStyle}>Timeslots</Text>
                <Text style={styles.subtitleStyle}>All lessons last an hour</Text>
                <TimeTableView
                  onEventPress={onEventPress}
                  events={events}
                  pivotTime={0}
                  pivotEndTime={24}
                  numberOfDays={7}
                  formatDateHeader="ddd"
                  headerStyle = {styles.headerStyle}
                  locale="en-US"/>
            </View>
        </View>
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
        margin: 5,
        backgroundColor: Colors.primary,
        borderRadius: 4,
    },
    contentStyle: {
        justifyContent: "center",
        margin: 5,
    },
    headerStyle: {
        backgroundColor: Colors.tabIconSelected
    },
})
