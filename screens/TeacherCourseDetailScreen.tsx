import {ActivityIndicator, Alert, Modal, ScrollView, StyleSheet, Text, View} from "react-native";
import CourseDescription from "../components/CourseDescription";
import React, {useEffect, useState} from "react";
import Server from "../constants/Server";
import {email, password} from "../store/state";
import { encode } from "base-64";
import alert from "../components/alert";
import Colors from "../constants/Colors";
import SubmitButton from "../components/SubmitButton";


export default function TeacherCourseDetailScreen({navigation, route}) {
  const [course, setCourse] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);

  const fetchCourse = async () => {
    try {
      const response = await fetch(`${Server.url}/teacher/courses/${route.params.courseId}`,{
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

  const deleteCourse = () =>{
    console.log('delete')
  }

  const editCourse = () =>{
    console.log('edit')
  }

  const goToStudents = () =>{
    console.log('s')
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
          <SubmitButton text={"Students"} buttonStyle={styles.button} onPress={goToStudents}/>
          <SubmitButton text={"Materials"} buttonStyle={styles.button} onPress={goToMaterials}/>
        </View>
        <View style={styles.buttonsRow}>
          <SubmitButton text={"Edit course"} buttonStyle={styles.button} onPress={editCourse}/>
          <SubmitButton text={"Delete course"} buttonStyle={styles.button} onPress={deleteCourse}/>
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
