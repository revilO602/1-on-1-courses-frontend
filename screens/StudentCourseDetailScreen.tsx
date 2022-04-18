import {ActivityIndicator, Alert, Modal, ScrollView, StyleSheet, Text, View} from "react-native";
import CourseDescription from "../components/CourseDescription";
import React, {useEffect, useState} from "react";
import Server from "../constants/Server";
import {email, password, userId} from "../store/state";
import { encode } from "base-64";
import alert from "../components/alert";
import Colors from "../constants/Colors";
import SubmitButton from "../components/SubmitButton";


export default function StudentCourseDetailScreen({navigation, route}) {
    const [course, setCourse] = useState({});
    const [isLoading, setLoading] = useState(true);
    const [events, setEvents] = useState([]);

    const removeTimeslot = async () => {
        console.log("som tu");
        try {
            const response = await fetch (`${Server.url}/courses/leave`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic '+ encode(`${email.get()}:${password.get()}`),
                },
                body: JSON.stringify({timeslots: [{id: route.params.id}]})

            })
            console.log(response.status);
            if (response.status === 200) {
                const json = await response.json();
                console.log(json);
                navigation.navigate("StudentCoursesScreen");
            }

        } catch (error) {
            console.log(error)
            alert("Server error", "SERVER ERROR");
        }

    }

    const fetchCourse = async () => {
        try {
            const response = await fetch(`${Server.url}/student/courses/${route.params.courseId}`,{
                headers: new Headers({
                    'Authorization': 'Basic '+ encode(`${email.get()}:${password.get()}`),
                }),
            });
            const json = await response.json();
            setCourse(json);
        } catch (error) {
            console.error(error);
            alert('Server error', 'SERVER ERROR')
        } finally {
            setLoading(false);
        }
    }

    useEffect( () =>{
        fetchCourse()
    },[])


    const callTeacher = () =>{
        navigation.navigate('JoinCallScreen', {roomId: `course${course.id}-student${userId.get()}`})
    }

    const leaveCourse = () =>{
        Alert.alert(
            "Leaving course",
            "Are you sure you want to leave course ?",
            [
                {
                   text: "CANCEL",
                    onPress: () => Alert.alert("Good choice :)"),
                    style: "cancel"
                },
                {
                    text: "OK",
                    onPress: () => removeTimeslot(),

                }
            ],
            {
                cancelable: true,
            }
        );
    }

    const goToMaterials = () =>{
        console.log('m')
    }

    return (
        <View style={styles.container}>
            <ScrollView keyboardShouldPersistTaps={"always"}>
                {isLoading ? <ActivityIndicator/> : (
                    <>
                        <CourseDescription course={course} onEventPress={null}
                                           events={events} setEvents={setEvents}/>
                    </>
                )}
                <View style={styles.buttonsRow}>
                    <SubmitButton text={"Leave Course"} buttonStyle={styles.button} onPress={leaveCourse}/>
                    <SubmitButton text={"Materials"} buttonStyle={styles.button} onPress={goToMaterials}/>
                </View>
                <View style={styles.buttonsRow}>
                    <SubmitButton text={"Call Teacher"} buttonStyle={styles.button} onPress={callTeacher}/>
                </View>
            </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.background,
        flex: 1
    },
    buttonsRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    button: {
        minWidth: 150
    }
})
