import {Pressable, View, StyleSheet, Text} from "react-native";
import {Picker} from '@react-native-picker/picker';
import {useState} from "react";
import * as React from "react";
import Colors from "../constants/Colors";
import SubmitButton from "./SubmitButton";

export default function TimeslotJoiner({ setModalVisible, joinTimeslot, event, courseName}) {
  return(
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text style={styles.heading}>Join timeslot</Text>
        <Text style={styles.subheading}>Reserve this timeslot for your lesson?</Text>
        <Text style={styles.subheading}>{event.timeslot.weekDay}, {event.title}</Text>
        <Text style={styles.subsubheading}>You can choose multiple timeslots per course!</Text>
        <SubmitButton
          onPress={() => joinTimeslot(event)}
          text={"Confirm"}/>
        <SubmitButton
          onPress={() => setModalVisible(false)}
          text={"Cancel"}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    marginTop: 22,
  },
  heading: {
    color: Colors.tabIconSelected,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 5
  },
  subheading: {
    color: Colors.tabIconSelected,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5
  },
  subsubheading: {
    color: Colors.tabIconSelected,
    fontSize: 16,
    textAlign: 'left',
    marginVertical: 5
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginVertical: 5,
    textAlign: 'left',
  }
});
