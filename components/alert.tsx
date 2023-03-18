import {Alert} from "react-native";

export default function alert(heading, data){
  Alert.alert(heading, data, [
    {
      text: 'Ok',
      style: 'cancel',
    },
  ]);
}

