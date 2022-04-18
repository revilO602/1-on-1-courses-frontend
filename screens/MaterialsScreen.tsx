import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, ScrollView, ActivityIndicator} from 'react-native';
import Colors from "../constants/Colors";
import TimeTableView, { genTimeBlock } from 'react-native-timetable';
import CourseDescription from "../components/CourseDescription";
import Material from "../components/Material";
import Server from "../constants/Server";
import {email, password} from "../store/state";
import alert from "../components/alert";




export default function MaterialScreen(){
    const [course, setCourse] = useState({});
    const [isLoading, setLoading] = useState(true);
    const [events, setEvents] = useState([]);

    const fetchMaterials = async () => {
        try {
            const response = await fetch(`${Server.url}/materials/${materialId}`,{
                headers: new Headers({
                    'Authorization': 'Basic '+ encode(`${email.get()}:${password.get()}`),
                }),
            });
            const json = await response.json();
            setCourse(json);
        } catch (error) {
            console.error(error);
            alert('Server error', 'SERVER ERROR')
        } finally {
            setLoading(false);
        }
    }

    useEffect( () =>{
        fetchMaterials()
    },[])

    return (
        <View style={styles.container}>
            <ScrollView keyboardShouldPersistTaps={"always"}>
                {isLoading ? <ActivityIndicator/> : (
                    <>
                        <Material navigation={navigation}/>
                        <Text style={styles.bottomText}>Tap on a timeslot to reserve it for your 1-on-1 lesson!</Text>
                    </>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.background,
        flex:1
    },
    bottomText: {
        color: Colors.tabIconSelected,
        fontWeight: 'bold',
        textAlign: 'left',
        marginHorizontal: 10,
        marginBottom: 10,
        fontSize: 20
    }
})