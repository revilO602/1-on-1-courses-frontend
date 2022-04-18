import {
  View,
  Text,
  StyleSheet,
  Pressable
} from "react-native";
import Colors from "../constants/Colors";
import React from "react";
import {FontAwesome5} from "@expo/vector-icons";
import * as FileSystem from 'expo-file-system';
import Server from "../constants/Server";
import { StorageAccessFramework } from 'expo-file-system';

export default function MaterialButton({ material }) {
  const onPress = async () => {
    console.log(FileSystem.documentDirectory)
    const result = await FileSystem.downloadAsync(
      `${Server.url}/media/${material.filePath}`,
      FileSystem.documentDirectory + material.filePath
    )
    console.log(result);
    const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();
    if (!permissions.granted) {
      return;
    }
    try {
      const res = await StorageAccessFramework.createFileAsync(permissions.directoryUri, material.filePath, result.headers["Content-Type"])
      console.log(res);
      const readFile = await FileSystem.readAsStringAsync(result.uri, { encoding: FileSystem.EncodingType.Base64 })
      await FileSystem.writeAsStringAsync(res, readFile, { encoding: FileSystem.EncodingType.Base64 })
    } catch(e){
      console.log(e);
    }
  }
  return (
    <Pressable style={({ pressed }) => [
      {
        backgroundColor: pressed ? Colors.tabIconSelected : Colors.primary,
      },
      styles.button,
    ]}
               onPress={onPress}>
      <View style={styles.viewStyle}>
        <Text style={styles.subtitleStyle}>{material.name}</Text>
        <FontAwesome5 name="file-download" size={24} color={Colors.tabIconSelected} style={styles.icon}/>
      </View>

    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background
  },
  text: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: Colors.text
  },
  button: {
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    elevation: 3,
    minWidth: 320,
    minHeight: 50,
  },
  titleStyle: {
    fontSize: 25,
    color: Colors.text,
    fontWeight: 'bold',
    margin: 5,
  },
  subtitleStyle: {
    fontSize: 15,
    color: Colors.text,
    fontWeight: 'bold',
    margin: 5,
  },
  viewStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 5,
    width: "100%"
  },
  icon: {
    marginRight: 10
  }
});
