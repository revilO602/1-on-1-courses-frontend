import {Pressable, View, StyleSheet, Text} from "react-native";
import {Picker} from '@react-native-picker/picker';
import {useState} from "react";
import * as React from "react";
import Colors from "../constants/Colors";
import SubmitButton from "./SubmitButton";
import {WEEK_DAYS} from "../constants/Weekdays";

export default function TimeslotAdder({setModalVisible, createTimeslot}) {
  const [selectedHour, setSelectedHour] = useState(0);
  const [selectedMinute, setSelectedMinute] = useState(0);
  const [selectedDay, setSelectedDay] = useState(WEEK_DAYS[0]);
  const renderHours = () => {
    const hours = []
    for (let i=0; i<24; i++){
      hours.push(<Picker.Item label={i.toString()} value={i} key={i}/>)
    }
    return hours
  }
  const renderMinutes = () => {
    const minutes = []
    for (let i=0; i<60; i++){
      minutes.push(<Picker.Item label={i.toString().padStart(2, '0')} value={i} key={i}/>)
    }
    return minutes
  }
  const renderWeekdays = () => {

    const items = []
    for (let day of WEEK_DAYS){
      items.push(<Picker.Item label={day.full} value={day} key={day.short}/>)
    }
    return items
  }
  return(
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text style={styles.heading}>Add timeslot</Text>
        <Text style={styles.subheading}>Every lesson lasts 60 minutes!</Text>
        <Text style={styles.subsubheading}>Pick day</Text>
        <View style={styles.picker}>
          <Picker
            selectedValue={selectedDay}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedDay(itemValue)
            }>
            {renderWeekdays()}
          </Picker>
        </View>
        <Text style={styles.subsubheading}>Pick start time</Text>
        <Text style={styles.modalText}>Hour</Text>
        <View style={styles.picker}>
          <Picker
            selectedValue={selectedHour}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedHour(itemValue)
            }>
            {renderHours()}
          </Picker>
        </View>
        <Text style={styles.modalText}>Minute</Text>
        <View style={styles.picker}>
          <Picker
            selectedValue={selectedMinute}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedMinute(itemValue)
            }>
            {renderMinutes()}
          </Picker>
        </View>
        <SubmitButton
          onPress={() => createTimeslot(selectedDay, selectedHour, selectedMinute)}
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginVertical: 5,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginVertical: 5,
    textAlign: 'left',
  },
  picker: {
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 5
  },
});
