import {View, Text, StyleSheet, TextInput, Button, ScrollView, ActivityIndicator, FlatList} from "react-native";
import Colors from "../constants/Colors";

export default function Errors({ errors }) {
  return (
    <View style={styles.container}>
        <FlatList
          data={errors}
          keyExtractor={(item, index) => item.key}
          renderItem={({ item, index }) => (
            <Text key={item} style={styles.text}> {item} </Text>
          )}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background
  },
  text: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: Colors.error
  },
});
