import {View, Text, StyleSheet, TextInput, Button, ScrollView, ActivityIndicator, FlatList} from "react-native";
import Colors from "../constants/Colors";
import {useEffect} from "react";

export default function Course({ navigation, course }) {
    const onPress = () => {
        console.log(course)
        //TODO tuto idem dorobit CourseDetail screen
    }

    return (
        <View style = {styles.listItem}>
            <Text style={{width: '70%'}}>{course.name}</Text>
            <Button title={"Learn More"} onPress={onPress}/>
        </View>
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
    listItem: {
        padding: 10,
        marginVertical: 10,
        backgroundColor: Colors.background,
        borderColor: 'black',
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});