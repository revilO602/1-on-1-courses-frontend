import {ActivityIndicator, ScrollView, StyleSheet, View, LogBox } from "react-native";
import CourseDescription from "../components/CourseDescription";
import React, {useEffect, useState} from "react";
import Server from "../constants/Server";
import {email, password} from "../store/state";
import { encode } from "base-64";
import alert from "../components/alert";
import Colors from "../constants/Colors";
import SubmitButton from "../components/SubmitButton";
import {useFocusEffect, useIsFocused} from "@react-navigation/native";


export default function TeacherCourseDetailScreen({navigation, route}) {
  const [course, setCourse] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);
  const fetchCourse = async () => {
    try {
      const response = await fetch(`${Server.url}/teacher/courses/${route.params.courseId}`,{
        headers: new Headers({
          'Authorization': 'Basic '+ encode(`${email.get()}:${password.get()}`),
        }),
      });
      if (response.status === 200){
        const json = await response.json();
        setCourse(json);
      } else {
        const json = await response.json()
        let errors = ''
        for (var key of Object.keys(json)) {
          errors = errors + `${json[key]}\n`
        }
        alert("Error", errors)
      }
    } catch (error) {
      console.error(error);
      alert('Server error', 'SERVER ERROR')
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect( () =>{
    navigation.addListener(
      'focus',
      () => {
        fetchCourse()
      }
    );
  })

  const deleteCourse = async () =>{
    try {
      const response = await fetch(`${Server.url}/courses/${route.params.courseId}`,{
        method: 'DELETE',
        headers: new Headers({
          'Authorization': 'Basic '+ encode(`${email.get()}:${password.get()}`),
        }),
      });
      if (response.status === 204){
        route.params.setCourses(route.params.courses.filter(c => c.id !== route.params.courseId))
        navigation.navigate('TeacherCoursesScreen')
        alert('Course deleted', "Course successfully deleted")
      }
      else{
        const json = await response.json()
        let errors = ''
        for (var key of Object.keys(json)) {
          errors = errors + `${json[key]}\n`
        }
        alert("Error", errors)
      }
    } catch (error) {
      console.error(error);
      alert('Server error', 'SERVER ERROR')
    } finally {
      setLoading(false);
    }
  }

  const editCourse = () =>{
    navigation.navigate('EditCourseScreen', {course: course, events: events, setEvents: setEvents})
    setLoading(true)
  }

  const goToStudents = () =>{
    navigation.navigate('StudentsScreen', {courseId: course.id})
  }

  const goToMaterials = () =>{
    navigation.navigate('TeacherMaterialsScreen', {courseId: course.id})
  }

  return (
    <View style={styles.container}>
      <ScrollView keyboardShouldPersistTaps={"always"}>
        {isLoading ? <ActivityIndicator/> : (
          <>
            <CourseDescription course={course} onEventPress={null}
                               events={events} setEvents={setEvents}/>
            <View style={styles.buttonsRow}>
              <SubmitButton text={"Students"} buttonStyle={styles.button} onPress={goToStudents}/>
              <SubmitButton text={"Materials"} buttonStyle={styles.button} onPress={goToMaterials}/>
            </View>
            <View style={styles.buttonsRow}>
              <SubmitButton text={"Edit course"} buttonStyle={styles.button} onPress={editCourse}/>
              <SubmitButton text={"Delete course"} buttonStyle={styles.button} onPress={deleteCourse}/>
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
  }
})
