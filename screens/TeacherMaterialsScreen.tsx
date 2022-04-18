import {View, StyleSheet, Text, Modal} from "react-native";
import Colors from "../constants/Colors";
import Materials from "../components/Materials";
import SubmitButton from "../components/SubmitButton";
import * as DocumentPicker from 'expo-document-picker';
import Server from "../constants/Server";
import alert from "../components/alert";
import {email, password} from "../store/state";
import {encode} from "base-64";
import {useState} from "react";
import TimeslotDeleter from "../components/TimeslotDeleter";
import * as React from "react";
import MaterialAdder from "../components/MaterialAdder";

export default function TeacherMaterialsScreen({ route }) {
  const [materialsKey, setMaterialsKey] = useState(0)
  const [modalVisible, setModalVisible] = useState(false)

  const uploadFile = async (file, name) =>{
    if (file === 'cancel') {
      alert('No file selected', 'Please, select a file first');
      return
    }
    if (!name || name.trim().length === 0) {
      alert('Missing file name', 'File name is required');
      return
    }
    const form = new FormData();
    form.append('name', name);
    form.append('file', {
      uri : file.uri,
      type: file.mimeType,
      name: file.name,
      size: file.size
    });
    console.log(form)
    try{
      let response = await fetch(
        `${Server.url}/courses/${route.params.courseId}/materials`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Basic '+ encode(`${email.get()}:${password.get()}`),
          },
          body: form,
        }
      );
      if (response.status == 201) {
        alert('Upload Successful', 'File successfully uploaded');
        materialsKey===0 ? setMaterialsKey(1) :  setMaterialsKey(0)
      } else {
        const json = await response.json()
        let errors = ''
        for (var key of Object.keys(json)) {
          errors = errors + `${json[key]}\n`
        }
        alert("Error", errors)
      }
    } catch (error){
      console.log(error)
      alert("Server error", "SERVER ERROR");
    } finally {
      setModalVisible(false)
    }
  }

  const showModal = () =>{
    setModalVisible(true)
  }

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <MaterialAdder setModalVisible={setModalVisible} uploadFile={uploadFile}/>
      </Modal>
      <Text style={styles.bottomText}>Tap on a material to download it!</Text>
      <Materials courseId={route.params.courseId} key={materialsKey}/>
      <View style={styles.buttonContainer}>
        <SubmitButton text={"Upload new material"} onPress={showModal}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1
  },
  buttonContainer: {
    alignItems: "flex-end",
    marginLeft: "auto",
    marginRight: 15,
    marginBottom: 5
  },
  bottomText: {
    color: Colors.tabIconSelected,
    fontWeight: 'bold',
    textAlign: 'left',
    marginHorizontal: 10,
    marginBottom: 10,
    fontSize: 20
  }
});
