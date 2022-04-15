import {Modal, ScrollView, StyleSheet, Text, View} from "react-native";
import Colors from "../constants/Colors";
import {Controller, useForm} from 'react-hook-form';
import Input from "../components/Input";
import * as React from "react";
import {useEffect, useState} from "react";
import DescriptionInput from "../components/DescriptionInput";
import {Picker} from '@react-native-picker/picker';
import Server from "../constants/Server";
import {encode} from "base-64";
import SubmitButton from "../components/SubmitButton";
import TimeTableView, { genTimeBlock } from 'react-native-timetable';
import TimeslotAdder from "../components/TimeslotAdder";
import {WEEK_DAYS} from "../constants/Weekdays";
import getOverlappingTimeslots from "../helpers/timeslotChecker"
import TimeslotDeleter from "../components/TimeslotDeleter";
import alert from "../components/alert";
import { email, password} from "../store/state";

export default function CreateCourseScreen({navigation}) {
  const {
    control,
    handleSubmit,
    formState: {errors, isValid}
  } = useForm({mode: "onBlur"})
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
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
      alert("Server error", "SERVER ERROR");
    }
  }
  const postCourse = async (data) => {
    try {
      const response = await fetch(`${Server.url}/courses/`,{
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic '+ encode(`${email.get()}:${password.get()}`),
        },
        body: JSON.stringify(data)
      });
      if (response.status === 201){
        navigation.navigate('CategoriesScreen')
        alert('Course created', "Course successfully created")
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
  const renderCategories = () => {
    const items = []
    for (let category of categories){
      items.push(<Picker.Item label={category.name} value={category.id} key={category.id}/>)
    }
    return items
  }

  const createTimeslot = (day, hour, minute) =>{
    let overlaps = getOverlappingTimeslots([...timeslots, {
      weekDay: day.full,
      startTime: `${hour.toString()}:${minute.toString().padStart(2, '0')}`
    }])
    if (overlaps.length > 0){
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
    let newTimeslot = {
      weekDay: day.full,
      startTime: `${hour.toString()}:${minute.toString().padStart(2, '0')}`
    }
    setEventsData([...eventsData, {
      title: `${hour.toString()}:${minute.toString().padStart(2, '0')} - ${endHour.toString()}:${minute.toString().padStart(2, '0')}`,
      startTime: genTimeBlock(day.short, hour, minute),
      endTime: genTimeBlock(endDay.short, endHour, minute),
      timeslot: newTimeslot,
    }])
    setTimeslots([...timeslots, newTimeslot])
    setAddModalVisible(false)

  }
  const deleteTimeslot = (event) =>{
    setTimeslots(timeslots.filter(timeslot => timeslot !== event.timeslot))
    setEventsData(eventsData.filter(ev => ev !== event))
    setDeleteModalVisible(false)
  }

  const confirm = async (data: FormData) => {
    if (timeslots.length < 1){
      alert("No timeslots", "Please add at least one timeslot")
      return
    }
    const course = {
      name: data.name,
      description: data.description,
      categoryId: selectedCategory,
      timeslots: timeslots
    }
    await postCourse(course)
  }

  const showTimeslotAdder = () => {
    setAddModalVisible(true)
  }
  const showTimeslotDeleter = () => {
    setDeleteModalVisible(true)
  }

  const clickedEvent = (data) =>{
    console.log(data)
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps={"always"}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={addModalVisible}
        onRequestClose={() => {
          setAddModalVisible(!addModalVisible);
        }}>
        <TimeslotAdder modalVisible={addModalVisible} setModalVisible={setAddModalVisible} createTimeslot={createTimeslot}/>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={deleteModalVisible}
        onRequestClose={() => {
          setDeleteModalVisible(!deleteModalVisible);
        }}>
        <TimeslotDeleter setModalVisible={setDeleteModalVisible} deleteTimeslot={deleteTimeslot} events={eventsData}/>
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
            inputStyle={{minWidth: 320}}
            errors={errors}
            name={"name"}
          />
        )}
        rules={{
          required: {
            value: true,
            message: "CourseButton name is required"
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
            errors={errors}
          />
        )}
        rules={{
          required: {
            value: true,
            message: "CourseButton description is required"
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
          onEventPress={clickedEvent}
          pivotTime={0}
          pivotEndTime={24}
          numberOfDays={7}
          formatDateHeader="ddd"
          headerStyle = {styles.headerStyle}
          locale="en-US"
        />
      </View>
      <View style={styles.timeslotButtonsContainer}>
        <SubmitButton text={"Add timeslot"} onPress={showTimeslotAdder}/>
        <SubmitButton text={"Delete timeslot"} onPress={showTimeslotDeleter}/>
      </View>
      <View style={styles.buttonContainer}>
        <SubmitButton text={"Confirm"} onPress={handleSubmit(confirm)}/>
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
    backgroundColor: Colors.tabIconSelected
  },
});
