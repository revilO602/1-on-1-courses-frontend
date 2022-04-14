import {Pressable, View, StyleSheet, Text} from "react-native";
import {Picker} from '@react-native-picker/picker';
import {useState} from "react";
import * as React from "react";


export default function TimeslotAdder({modalVisible, setModalVisible}) {
  const [selectedHour, setSelectedHour] = useState();
  const [selectedMinute, setSelectedMinute] = useState();
  const [selectedDay, setSelectedDay] = useState();
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
      minutes.push(<Picker.Item label={i.toString()} value={i} key={i}/>)
    }
    return minutes
  }
  const renderWeekdays = () => {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    const items = []
    for (let day of days){
      items.push(<Picker.Item label={day} value={day} key={day}/>)
    }
    return items
  }
  return(
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text style={styles.modalText}>Hello World!</Text>
        <Picker
          selectedValue={selectedHour}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedHour(itemValue)
          }>
          {renderHours()}
        </Picker>
        <Text style={{width: '100%', height: 60, position: 'absolute', bottom: 0, left: 0}}>{' '}</Text>
        <Picker
          selectedValue={selectedMinute}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedMinute(itemValue)
          }>
          {renderMinutes()}
        </Picker>
        <Text style={{width: '100%', height: 60, position: 'absolute', bottom: 0, left: 0}}>{' '}</Text>
        <Picker
          selectedValue={selectedDay}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedDay(itemValue)
          }>
          {renderWeekdays()}
        </Picker>
        <Text style={{width: '100%', height: 60, position: 'absolute', bottom: 0, left: 0}}>{' '}</Text>
        {/*<Pressable*/}
        {/*  style={[styles.button, styles.buttonClose]}*/}
        {/*  onPress={() => setModalVisible(!modalVisible)}>*/}
        {/*  <Text style={styles.textStyle}>Hide Modal</Text>*/}
        {/*</Pressable>*/}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    marginTop: 22,
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
    marginBottom: 15,
    textAlign: 'center',
  },
});
