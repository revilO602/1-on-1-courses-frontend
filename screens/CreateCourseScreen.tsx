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
import {email, password} from "../store/state";
import Errors from "../components/Errors";
import SubmitButton from "../components/SubmitButton";
import TimeTableView, { genTimeBlock } from 'react-native-timetable';
import TimeslotAdder from "../components/TimeslotAdder";

export default function CreateCourseScreen({navigation}) {
  const {
    control,
    handleSubmit,
    formState: {errors, isValid}
  } = useForm({mode: 'onBlur'})
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState();
  const [categories, setCategories] = useState([]);
  const [eventsData, setEventsData] = useState([{
    title: "9:00 - 10:50",
    startTime: genTimeBlock("MON", 9),
    endTime: genTimeBlock("MON", 10, 50),
  }])

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

  const confirm = () => {
    console.log("confirmed")
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
        <TimeslotAdder modalVisible={modalVisible} setModalVisible={setModalVisible}/>
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
      <TimeTableView
        events={eventsData}
        pivotTime={0}
        pivotEndTime={24}
        numberOfDays={7}
        formatDateHeader="ddd"
        headerStyle = {styles.headerStyle}
        locale="en-US"
      />
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
