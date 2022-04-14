import {TextInput, StyleSheet, View, Text} from "react-native";
import * as React from "react";
import Colors from "../constants/Colors";

export default function DescriptionInput({value, onBlur, onChangeText}) {
  return(
    <View style={styles.container}>
      <Text style={styles.label}>Description</Text>
      <TextInput
        placeholder="Enter course description..."
        value={value}
        onBlur={onBlur}
        onChangeText={onChangeText}
        style={[styles.text, styles.input]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 3,
    marginHorizontal: 22,

  },
  input:{
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderRadius: 20,
    borderWidth: 1,
    minHeight: 200,
    minWidth: 300
  },
  text: {
    fontSize: 18,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: Colors.text,
    textAlign: "left",
    textAlignVertical: "top"
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
