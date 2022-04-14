import {Alert, Modal, ScrollView, StyleSheet, Text, View} from "react-native";
import Colors from "../constants/Colors";
import {Controller, useForm} from 'react-hook-form';
import Input from "../components/Input";
import * as React from "react";
import {useEffect, useState} from "react";
import DescriptionInput from "../components/DescriptionInput";
import {Picker} from '@react-native-picker/picker';
import Server from "../constants/Server";
import {encode} from "base-64";
import {email, password} from "../store/state";
import Errors from "../components/Errors";
import SubmitButton from "../components/SubmitButton";
import TimeTableView, { genTimeBlock } from 'react-native-timetable';
import TimeslotAdder from "../components/TimeslotAdder";
import {WEEK_DAYS} from "../constants/Weekdays";
import getOverlappingTimeslots from "../helpers/timeslotChecker"

export default function CreateCourseScreen({navigation}) {
  const {
    control,
    handleSubmit,
    formState: {errors, isValid}
  } = useForm({mode: 'onBlur'})
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState();
  const [categories, setCategories] = useState([]);
  const [eventsData, setEventsData] = useState([])
  const [timeslots, setTimeslots] = useState([])

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${Server.url}/courses/categories`,{
        headers: new Headers({
          'Authorization': 'Basic '+ encode(`${email.get()}:${password.get()}`),
        }),
      });
      const json = await response.json()
      setCategories(json)
    } catch (error) {
      console.error(error);
    }
  }
  const renderCategories = () => {
    const items = []
    for (let category of categories){
      items.push(<Picker.Item label={category.name} value={category.id} key={category.id}/>)
    }
    return items
  }
  const alert = (heading, data) =>
    Alert.alert(heading, data, [
      {
        text: 'Ok',
        style: 'cancel',
      },
    ]);
  const createTimeslot = (day, hour, minute) =>{
    let overlaps = getOverlappingTimeslots([...timeslots, {
      weekDay: day.full,
      startTime: `${hour.toString()}:${minute.toString().padStart(2, '0')}`
    }])
    if (overlaps.length > 0){
      console.log(overlaps)
      let overlapsText = ''
      for (let timeslotPair of overlaps){
        overlapsText += `${timeslotPair[0].weekDay}, ${timeslotPair[0].startTime} and ${timeslotPair[1].weekDay}, ${timeslotPair[1].startTime}\n`
      }
      alert("Overlapping timeslots",
        `Can't create timeslot because these timeslots would overlap:\n${overlapsText}`)
      return
    }
    let endHour
    let endDay
    if (hour === 23){
      endHour = 0
      if(day.short === "SUN"){
        endDay=WEEK_DAYS[0]
      }
      else {
        endDay = WEEK_DAYS[WEEK_DAYS.indexOf(day)+1]
      }
    }
    else{
      endHour = hour + 1
      endDay = day
    }
    setEventsData([...eventsData, {
      title: "hello",
      startTime: genTimeBlock(day.short, hour, minute),
      endTime: genTimeBlock(endDay.short, endHour, minute),
    }])
    setTimeslots([...timeslots, {
      weekDay: day.full,
      startTime: `${hour.toString()}:${minute.toString().padStart(2, '0')}`
    }])
    setModalVisible(!modalVisible)

  }
  const confirm = () => {
    console.log(timeslots)
  }

  const addTimeslot = () => {
    setModalVisible(true)
  }
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <TimeslotAdder modalVisible={modalVisible} setModalVisible={setModalVisible} createTimeslot={createTimeslot}/>
      </Modal>
      <Controller
        control={control}
        name="name"
        render={({field: {onChange, value, onBlur}}) => (
          <Input
            label={"Name"}
            placeholder="Enter course name..."
            value={value}
            onBlur={onBlur}
            onChangeText={(value: any) => onChange(value)}
            inputStyle={{minWidth: 300}}
          />
        )}
        rules={{
          required: {
            value: true,
            message: "Course name is required"
          },
        }}
      />
      <Controller
        control={control}
        name="description"
        render={({field: {onChange, value, onBlur}}) => (
          <DescriptionInput
            value={value}
            onBlur={onBlur}
            onChangeText={(value: any) => onChange(value)}
          />
        )}
        rules={{
          required: {
            value: true,
            message: "Course description is required"
          },
        }}
      />
      <Text style={styles.label}>Category</Text>
      <View style={styles.picker}>
        <Picker
          selectedValue={selectedCategory}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedCategory(itemValue)
          }>
          {renderCategories()}
        </Picker>
      </View>
      <Text style={styles.label}>Timeslots</Text>
      <View style={{marginHorizontal: 5}}>
        <TimeTableView
          events={eventsData}
          pivotTime={0}
          pivotEndTime={24}
          numberOfDays={7}
          formatDateHeader="ddd"
          headerStyle = {styles.headerStyle}
          locale="en-US"
        />
      </View>
      <View style={styles.timeslotButtonsContainer}>
        <SubmitButton text={"Add timeslot"} onPress={addTimeslot}/>
        <SubmitButton text={"Delete timeslot"} onPress={confirm}/>
      </View>
      <View style={styles.buttonContainer}>
        <SubmitButton text={"Confirm"} onPress={confirm}/>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background
  },
  picker: {
    marginHorizontal: 22,
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 5
  },
  label: {
    fontSize: 12,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: Colors.tabIconDefault,
    textAlign: "left",
    marginVertical: 3,
    marginHorizontal: 22,
  },
  buttonContainer: {
    alignItems: "flex-end",
    marginLeft: "auto",
    marginRight: 15,
    marginBottom: 5
  },
  timeslotButtonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  headerStyle: {
    backgroundColor: '#81E1B8'
  },
});
