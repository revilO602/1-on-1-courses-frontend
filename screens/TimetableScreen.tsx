import TimeTableView, {genTimeBlock} from "react-native-timetable";
import React, { useEffect, useState } from 'react';
import {ScrollView, StyleSheet, Text, View} from "react-native";
import Colors from "../constants/Colors";
import { encode } from "base-64";
import {email, password} from "../store/state";
import Server from "../constants/Server";


export default function TimetableScreen() {
    const [gotTimeslots, setTimeslots] = useState<any []>([]);

    const fetchData = async () => {
        try {
            const response = await fetch(`${Server.url}/timetable`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + encode(`${email.get()}:${password.get()}`),
                },

                });
                if (response.status === 200) {
                    const json = await response.json();

                    modifyData(json.teacherTimeslots[0], json.studentTimeslots[0])

                } else {
                    alert("Invalid credentials")
                }
        } catch (error) {
            alert(JSON.stringify(error));
        }
    }

    const modifyData = (teacher: any, student: any) => {
        const arr = [];
        if (teacher != undefined) {
            arr.push(...teacher.map((timeslot: any) => {
                const time = timeslot.startTime;
                const weekday = timeslot.weekDay.substring(0, 3).toUpperCase();
                const endHour = parseInt(time) + 1

                return {
                    title: `${time.substring(0, 2)} - ${endHour.toString()}`,
                    startTime: genTimeBlock(`${weekday.substring(0, 3).toUpperCase()}`, `${parseInt(time.substring(0, 2))}`),
                    endTime: genTimeBlock(`${weekday.substring(0, 3).toUpperCase()}`, `${parseInt(time.substring(0, 2)) + 1}`, 50),
                    extra_descriptions: ["Teaching"],
                    location: "App",
                }
            }));
        }

        if (student != undefined) {
            arr.push(...student.map((timeslot: any) => {
                    const time = timeslot.startTime;
                    const weekday = timeslot.weekDay.substring(0, 3).toUpperCase();
                    const endHour = parseInt(time) + 1

                    return {
                        title: `${time.substring(0, 2)} - ${endHour.toString()}`,
                        startTime: genTimeBlock(`${weekday.substring(0, 3).toUpperCase()}`, `${parseInt(time.substring(0, 2))}`),
                        endTime: genTimeBlock(`${weekday.substring(0, 3).toUpperCase()}`, `${parseInt(time.substring(0, 2)) + 1}`, 50),
                        extra_descriptions: ["Schooling"],
                        location: "App",
                    }
                }));
        }

        setTimeslots(arr);
    }

    useEffect( ()  => {
        fetchData()
    }, []);

    return (
        <ScrollView contentContainerStyle={{backgroundColor: Colors.background, margin: 5}}>
            <TimeTableView
                events={gotTimeslots}
                pivotTime={0}
                pivotEndTime={24}
                numberOfDays={7}
                formatDateHeader="ddd"
                headerStyle = {styles.headerStyle}
                locale="en-US"/>
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
