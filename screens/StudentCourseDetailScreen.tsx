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

    const leaveTimeslot = async (timeslotId) => {
        try {
            const response = await fetch (`${Server.url}/courses/leave`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic '+ encode(`${email.get()}:${password.get()}`),
                },
                body: JSON.stringify([{id: timeslotId}])

            })
            if (response.status === 204) {
                setEvents(events.filter(ev => ev.timeslot.id !== timeslotId))
            } else {
                const json = await response.json()
                let errors = ''
                for (var key of Object.keys(json)) {
                    errors = errors + `${json[key]}\n`
                }
                alert("Error", errors)
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
    const showLeaveConfirmation = (event) => {
        Alert.alert("Leave this timeslot?",
          `${event.timeslot.weekDay}, ${event.title}`, [
              {
                  text: 'Confirm',
                  onPress: () => leaveTimeslot(event.timeslot.id),
              },
              {
                  text: 'Cancel',
                  style: 'cancel',
              },
          ]);
    }

    useEffect( () =>{
        fetchCourse()
    },[])


    const callTeacher = () =>{
        navigation.navigate('JoinCallScreen', {roomId: `course${course.id}-student${userId.get()}`})
    }

    const goToMaterials = () =>{
        navigation.navigate('StudentMaterialsScreen', {courseId: course.id})
    }

    return (
        <View style={styles.container}>
            <ScrollView keyboardShouldPersistTaps={"always"}>
                {isLoading ? <ActivityIndicator/> : (
                    <>
                        <CourseDescription course={course} onEventPress={showLeaveConfirmation}
                                           events={events} setEvents={setEvents}/>
                        <Text style={styles.bottomText}>Tap on a timeslot to leave it!</Text>
                        <View style={styles.buttonsRow}>
                            <SubmitButton text={"Materials"} buttonStyle={styles.button} onPress={goToMaterials}/>
                        </View>
                        <View style={styles.buttonsRow}>
                            <SubmitButton text={"Join call with teacher"} buttonStyle={styles.button} onPress={callTeacher}/>
                        </View>
                    </>
                )}
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
    },
    bottomText: {
        color: Colors.tabIconSelected,
        fontWeight: 'bold',
        textAlign: 'left',
        marginHorizontal: 10,
        marginBottom: 10,
        fontSize: 20
    }
})
