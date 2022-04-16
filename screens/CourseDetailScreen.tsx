import {ActivityIndicator, Alert, Modal, ScrollView, StyleSheet, Text, View} from "react-native";
import CourseDescription from "../components/CourseDescription";
import React, {useEffect, useState} from "react";
import Server from "../constants/Server";
import {email, password} from "../store/state";
import { encode } from "base-64";
import alert from "../components/alert";
import Colors from "../constants/Colors";


export default function CourseDetailScreen({navigation, route}) {
  const [course, setCourse] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);

  const joinTimeslot = async (data)=>{
    try {
      const response = await fetch(`${Server.url}/courses/join`,{
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic '+ encode(`${email.get()}:${password.get()}`),
        },
        body: JSON.stringify([{id: data.timeslot.id}])
      });
      if (response.status === 200){
        setEvents(events.filter(ev => ev.timeslot !== data.timeslot))
      }
      else{
        const json = await response.json()
        let errors = ''
        for (var key of Object.keys(json)) {
          if (key === "overlappingTimeslots"){
            let overlapsText = ''
            for (let timeslotPair of json[key]){
              overlapsText += `${timeslotPair[0].weekDay}, ${timeslotPair[0].startTime} and ${timeslotPair[1].weekDay}, ${timeslotPair[1].startTime}\n`
            }
            errors = errors + `${overlapsText}\n`
          }
          else errors = errors + `${json[key]}\n`
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
      const response = await fetch(`${Server.url}/courses/${route.params.courseId}`,{
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
  const showJoinConfirmation = (event) => {
    Alert.alert("Reserve this timeslot for your lesson?",
      `${event.timeslot.weekDay}, ${event.title}\n\nYou can choose multiple timeslots per course!`, [
        {
          text: 'Confirm',
          onPress: () => joinTimeslot(event),
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

  return (
    <View style={styles.container}>
      <ScrollView keyboardShouldPersistTaps={"always"}>
        {isLoading ? <ActivityIndicator/> : (
          <>
            <CourseDescription navigation={navigation} course={course} onEventPress={showJoinConfirmation}
                               events={events} setEvents={setEvents}/>
            <Text style={styles.bottomText}>Tap on a timeslot to reserve it for your 1-on-1 lesson!</Text>
          </>
        )}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex:1
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
