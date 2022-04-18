import {View, StyleSheet, ActivityIndicator, FlatList, Text} from "react-native";
import Colors from "../constants/Colors";
import {useEffect, useState} from "react";
import { encode } from "base-64";
import Server from "../constants/Server";
import alert from "../components/alert";
import { email, password} from "../store/state";
import StudentButton from "../components/StudentButton";

export default function StudentsScreen({ navigation, route }) {
  const [isLoading, setLoading] = useState(true);
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    try {
      const response = await fetch(`${Server.url}/courses/${route.params.courseId}/students`,{
        headers: new Headers({
          'Authorization': 'Basic '+ encode(`${email.get()}:${password.get()}`),
        }),
      });
      if(response.status === 200) {
        const json = await response.json();
        setStudents(json);
      }
    } catch (error) {
      console.error(error);
      alert("Server error", "SERVER ERROR")
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchStudents()
  }, []);

  return (
    <View style={styles.container} >
      {isLoading ? <ActivityIndicator/> : (
        <View>
          <FlatList
            data={students}
            renderItem={({ item }) => (
              <StudentButton key={item.id} student={item} navigation={navigation} courseId={route.params.courseId}/>
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
