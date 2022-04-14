import TimeTableView, {genTimeBlock} from "react-native-timetable";
import React from "react";
import {ScrollView, StyleSheet, Text, View} from "react-native";
import Colors from "../constants/Colors";

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

    return (
        <ScrollView contentContainerStyle={{backgroundColor: Colors.background, margin: 5}}>
            <TimeTableView
                //scrollViewRef={this.scrollViewRef}
                events={events_data}
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