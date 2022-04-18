import {View, StyleSheet, ActivityIndicator, FlatList} from "react-native";
import Colors from "../constants/Colors";
import {useEffect, useState} from "react";
import { encode } from "base-64";
import Server from "../constants/Server";
import alert from "./alert";
import { email, password} from "../store/state";
import MaterialButton from "./MaterialButton";

export default function Materials({ courseId }) {
  const [isLoading, setLoading] = useState(true);
  const [materials, setMaterials] = useState([]);

  const fetchMaterials = async () => {
    try {
      const response = await fetch(`${Server.url}/courses/${courseId}/materials`,{
        headers: new Headers({
          'Authorization': 'Basic '+ encode(`${email.get()}:${password.get()}`),
        }),
      });
      if(response.status === 200) {
        const json = await response.json();
        console.log(json)
        setMaterials(json);
      }
    } catch (error) {
      console.error(error);
      alert("Server error", "SERVER ERROR")
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMaterials()
  }, []);

  return (
    <View style={styles.container} >
      {isLoading ? <ActivityIndicator/> : (
        <View>
          <FlatList
            data={materials}
            renderItem={({ item }) => (
              <MaterialButton material={item} key={item.id}/>
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
