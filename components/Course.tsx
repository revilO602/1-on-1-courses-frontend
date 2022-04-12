import {View, Text, StyleSheet, TextInput, Button, ScrollView, ActivityIndicator, FlatList} from "react-native";
import Colors from "../constants/Colors";
import {useEffect, useState} from "react";
import Server from "../constants/Server";
import { encode } from "base-64";

export default function Course({ navigation, course }) {
    const onPress = () => {
        console.log(courses);
        //TODO tuto idem dorobit CourseDetail screen
        navigation.navigate('CourseDetailScreen', { courses })
    }

    const [isLoading, setLoading] = useState(true);
    const [courses, setCourses] = useState([]);

    const fetchCourses = async () => {
        try {
            const response = await fetch(`${Server.url}/courses/${course.id}`,{
                headers: new Headers({
                    'Authorization': 'Basic '+ encode('teacher1@login.sk:heslo'),
                }),
            });
            if(response.status === 200) { // neviem ci to je spravne z hladiska poradia async operacii
                const json = await response.json();
                //console.log([json])
                setCourses([json]); // Treba fixnut endpoint aby vracal pole
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCourses()
    }, []);

    return (
        <View>
            {isLoading ? <ActivityIndicator/> : (
                <View style = {styles.listItem}>
                    <Text style={{width: '70%'}}>{course.name}</Text>
                    <Button title={"Learn More"} onPress={onPress}/>
                </View>
            )}
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