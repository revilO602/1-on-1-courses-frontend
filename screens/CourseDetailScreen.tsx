import {ActivityIndicator, View} from "react-native";
import CourseDescription from "../components/CourseDescription";
import {useEffect, useState} from "react";
import Server from "../constants/Server";
import {email, password} from "../store/state";
import { encode } from "base-64";


export default function CourseDetailScreen({navigation, route}) {
  const [course, setCourse] = useState({});
  const [isLoading, setLoading] = useState(true);

  const fetchCourse = async () => {
    try {
      const response = await fetch(`${Server.url}/courses/${route.params.courseId}`,{
        headers: new Headers({
          'Authorization': 'Basic '+ encode(`${email.get()}:${password.get()}`),
        }),
      });
      const json = await response.json();
      setCourse(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() =>{
    fetchCourse()
  },[])

  return (
      <View>
        {isLoading ? <ActivityIndicator/> : (
          <CourseDescription navigation={navigation} course={course}>

          </CourseDescription>
        )}
      </View>
  );
}
