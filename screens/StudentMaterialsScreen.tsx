import {View, StyleSheet, Text} from "react-native";
import Colors from "../constants/Colors";
import Materials from "../components/Materials";
import * as React from "react";

export default function StudentMaterialsScreen({ route }) {
  return (
    <View style={styles.container}>
      <Text style={styles.bottomText}>Tap on a material to download it!</Text>
      <Materials courseId={route.params.courseId}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1
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
