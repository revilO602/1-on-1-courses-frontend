import {View, Text, StyleSheet, TextInput, Button, ScrollView, ActivityIndicator, FlatList} from "react-native";
import Colors from "../constants/Colors";
import {useEffect, useState} from "react";
import { encode } from "base-64";
import Server from "../constants/Server";
import CourseButton from "./CourseButton";
import alert from "./alert";
import { email, password} from "../store/state";

export default function Courses({ navigation, props }) {
    const [isLoading, setLoading] = useState(true);
    const [courses, setCourses] = useState([]);

    const fetchCourses = async () => {
        try {
            const response = await fetch(`${Server.url}/courses/?categoryId=${props.id}`,{
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

    useEffect(() => {
        fetchCourses()
    }, []);

    return (
        <View style={styles.container} >
            {isLoading ? <ActivityIndicator/> : (
                <View>
                    <FlatList
                        data={courses}
                        renderItem={({ item }) => (
                            <CourseButton navigation={navigation} course={item} key={item.id} nextScreen={'CourseDetailScreen'}/>
                        )}
                    />
                </View>
            )}
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.background,
        flex: 1
    },
});
