import TimeTableView, {genTimeBlock} from "react-native-timetable";
import React, { useEffect, useState } from 'react';
import {ActivityIndicator, ScrollView, StyleSheet} from "react-native";
import Colors from "../constants/Colors";
import { encode } from "base-64";
import {email, password} from "../store/state";
import Server from "../constants/Server";
import {WEEK_DAYS} from "../constants/Weekdays";


export default function TimetableScreen() {
    const [events, setEvents] = useState([])
    const [isLoading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const response = await fetch(`${Server.url}/timetable`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + encode(`${email.get()}:${password.get()}`),
                },

                });
                if (response.status === 200) {
                    const json = await response.json();
                    console.log(json)
                    createEvents(json.teacherTimeslots, json.studentTimeslots);

                } else {
                    alert("Invalid credentials")
                }
        } catch (error) {
            alert(JSON.stringify(error));
        } finally {
            setLoading(false)
        }
    }

    const createEvent = (timeslot) =>{
        console.log(timeslot)
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
        return  {
            title: `${startHour.toString()}:${startMinute.toString().padStart(2, '0')}`,
            startTime: genTimeBlock(startDayShort, startHour, startMinute),
            endTime:  genTimeBlock(endDayShort, endHour, startMinute),
        }
    }

    const createEvents = (teacherTimeslots, studentTimeslots) => {
        let localEvents = []
        teacherTimeslots.forEach((timeslot)=>{
            let event = createEvent(timeslot)
            event["location"] = `${timeslot.course.name}`
            event["extra_descriptions"] = ["Teaching"]
            if (timeslot.student != null){
                event["extra_descriptions"].push(`${timeslot.student.firstName[0]}.${timeslot.student.lastName}`)
            }
            localEvents.push(event)
        })
        studentTimeslots.forEach((timeslot)=>{
            let event = createEvent(timeslot)
            event["extra_descriptions"] = ["Learning"]
            event["location"] = `${timeslot.course.name}`
            localEvents.push(event)
        })
        setEvents(localEvents);
    }

    useEffect( ()  => {
        fetchData()
    }, []);

    return (
        <ScrollView contentContainerStyle={{backgroundColor: Colors.background, margin: 5}}>
            {isLoading ? <ActivityIndicator/> : (
              <TimeTableView
                events={events}
                pivotTime={0}
                pivotEndTime={24}
                numberOfDays={7}
                formatDateHeader="ddd"
                headerStyle = {styles.headerStyle}
                locale="en-US"/>
            )}
        </ScrollView>
    );
};

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
    },
    headerStyle: {
        backgroundColor: Colors.tabIconSelected
    },
});
