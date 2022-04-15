import {Pressable, View, StyleSheet, Text} from "react-native";
import {Picker} from '@react-native-picker/picker';
import {useState} from "react";
import * as React from "react";
import Colors from "../constants/Colors";
import SubmitButton from "./SubmitButton";

export default function TimeslotJoiner({ setModalVisible, joinTimeslot, events}) {
  const [selectedEvent, setSelectedEvent] = useState(events[0]);

  const renderTimeslots = () => {
    const items = []
    for (let event of events){
      const label = `${event.timeslot.weekDay}, ${event.timeslot.startTime}`
      items.push(<Picker.Item label={label} value={event} key={label}/>)
    }
    return items
  }
  return(
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text style={styles.heading}>Delete timeslot</Text>
        <Text style={styles.subheading}>Every lesson lasts 60 minutes!</Text>
        <Text style={styles.subsubheading}>Pick timeslot</Text>
        <View style={styles.picker}>
          <Picker
            selectedValue={selectedEvent}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedEvent(itemValue)
            }>
            {renderTimeslots()}
          </Picker>
        </View>
        <SubmitButton
          onPress={() => deleteTimeslot(selectedEvent)}
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
