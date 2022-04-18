import {Pressable, View, StyleSheet, Text, TextInput} from "react-native";
import {useState} from "react";
import * as React from "react";
import Colors from "../constants/Colors";
import SubmitButton from "./SubmitButton";
import Input from "./Input";
import * as DocumentPicker from "expo-document-picker";

export default function MaterialAdder({setModalVisible, uploadFile }) {
  const [name, setName] = useState('');
  const [file, setFile] = useState('cancel');
  const [fileName, setFileName] = useState('');

  const chooseFile = async () =>{
    const result = await DocumentPicker.getDocumentAsync()
    if (result.type==='success') {
      setFile(result)
      setFileName(result.name)
    }
  }

  return(
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text style={styles.heading}>Upload material</Text>
        <Text style={styles.subheading}>Choose a file and name</Text>
        <Text style={styles.label}>Material name</Text>
        <TextInput
          placeholder="Enter material name..."
          value={name}
          onChangeText={(value: any) => setName(value)}
          style={styles.input}
        />
        <Text style={styles.label}>Chosen file name</Text>
        <Text style={styles.input}>{fileName}</Text>
        <SubmitButton text={"Choose file"} onPress={chooseFile}/>
        <SubmitButton
          onPress={() => uploadFile(file, name)}
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
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginVertical: 5,
    textAlign: 'left',
  },
  input:{
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderRadius: 20,
    borderWidth: 1,
    fontSize: 18,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: Colors.text,
    textAlign: "left",
    marginVertical: 5
  },
  label: {
    fontSize: 12,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: Colors.tabIconDefault,
    textAlign: "left"
  }
});
