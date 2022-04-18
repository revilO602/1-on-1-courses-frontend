import {ActivityIndicator, FlatList, Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import Colors from "../constants/Colors";
import Server from "../constants/Server";
import {email, password} from "../store/state";
import alert from "../components/alert";
import { encode } from "base-64";
import {useEffect, useState} from "react";
import CourseButton from "../components/CourseButton";
import {useFocusEffect} from "@react-navigation/native";


export default function StudentCoursesScreen({ navigation, route }) {
    const [courses, setCourses] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const fetchCourses = async () => {
        try {
            const response = await fetch(`${Server.url}/student/courses`,{
                headers: new Headers({
                    'Authorization': 'Basic '+ encode(`${email.get()}:${password.get()}`),
                }),
            });
            if(response.status === 200) {
                const json = await response.json();
                setCourses(json);
            }
        } catch (error) {
            console.error(error);
            alert("Server error", "SERVER ERROR")
        } finally {
            setLoading(false);
        }
    }

    useFocusEffect( () =>{
        navigation.addListener(
          'focus',
          () => {
              fetchCourses()
          }
        );
    })

    return (
        <View style={styles.container}>
            {isLoading ? <ActivityIndicator/> : (
                <View>
                    <FlatList
                        data={courses}
                        renderItem={({ item }) => (
                            <CourseButton navigation={navigation} course={item} key={item.id}
                                          nextScreen={'StudentCourseDetailScreen'} setLoading={setLoading}/>
                        )}
                    />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    titleStyle: {
        fontSize: 20,
        color: Colors.text,
        fontWeight: 'bold',
        margin: 5,
    },
    subtitleStyle: {
        fontSize: 12,
        color: Colors.text,
        fontWeight: 'bold',
        margin: 5,
    },
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    descriptionStyle: {
        fontSize: 22,
        color: Colors.text,
        fontWeight: 'bold',
        margin: 5,
    },
    viewStyle: {
        marginBottom: 5,
        marginTop: 5,
        backgroundColor: Colors.primary,
        borderRadius: 4,
    },
    contentStyle: {
        justifyContent: "center",
        margin: 5,
    },
    button: {
        margin: 5,
        //alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        elevation: 3,
        minWidth: 400,
        minHeight: 50,
    },

})
