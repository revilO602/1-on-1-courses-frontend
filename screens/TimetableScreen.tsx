import TimeTableView, {genTimeBlock} from "react-native-timetable";
import React, { useEffect, useState } from 'react';
import {ScrollView, StyleSheet, Text, View} from "react-native";
import Colors from "../constants/Colors";
import { encode } from "base-64";
import {signedIn, email, password} from "../store/state";
import Server from "../constants/Server";

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
    },
    {
        title: "Physics",
        startTime: genTimeBlock("WED", 11),
        endTime: genTimeBlock("WED", 11, 50),
        location: "Lab 404",
        extra_descriptions: ["Einstein"],
    },
    {
        title: "Mandarin",
        startTime: genTimeBlock("TUE", 9),
        endTime: genTimeBlock("TUE", 10, 50),
        location: "Language Center",
        extra_descriptions: ["Chen"],
    },
    {
        title: "Japanese",
        startTime: genTimeBlock("FRI", 9),
        endTime: genTimeBlock("FRI", 10, 50),
        location: "Language Center",
        extra_descriptions: ["Nakamura"],
    },
    {
        title: "Club Activity",
        startTime: genTimeBlock("THU", 9),
        endTime: genTimeBlock("THU", 10, 50),
        location: "Activity Center",
    },
    {
        title: "Club Activity",
        startTime: genTimeBlock("FRI", 13, 30),
        endTime: genTimeBlock("FRI", 14, 50),
        location: "Activity Center",
    },
];


export default function TimetableScreen(){
    const [gotTimeslots, setTimeslots] = useState([]);
    const [getJson, setJson] = useState([])
    const getTimetable = async () => {
        try {
            const response = await fetch(`${Server.url}/timetable`,{
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic '+ encode(`${email.get()}:${password.get()}`),
                },

            });
            if (response.status === 200) {
                const json = await response.json();
                //signedIn.set(true)
                console.log(json);
                setJson(json);
            } else {
                alert("Invalid credentials")
            }
        } catch (error) {
            alert(JSON.stringify(error));
        }
    }
    console.log(email.get());
    useEffect(() => {
        getTimetable()
    }, []);

    const actor = (email.get()).substring(0, 7);

    // useEffect(() => {
    //     getTimetable();
    //     setTimeslots(getJson.studentTimeslots.map((timeslot: any) => {
    //         //console.log(timeslot.startTime)
    //         const time = timeslot.startTime;
    //         const weekday = timeslot.weekDay.substring(0,3).toUpperCase();
    //         const endHour = parseInt(time) + 1
    //
    //         console.log(weekday);
    //         return {
    //             title: `${time.substring(0, 2)} - ${endHour.toString()}`,
    //             startTime: genTimeBlock(`${weekday.substring(0, 3).toUpperCase()}`, `${parseInt(time.substring(0, 2))}`),
    //             endTime: genTimeBlock(`${weekday.substring(0, 3).toUpperCase()}`, `${parseInt(time.substring(0, 2)) + 1}`, 50),
    //         }
    //     }))
    // }, []);

    return (
        <ScrollView contentContainerStyle={{backgroundColor: Colors.background, margin: 5}}>
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