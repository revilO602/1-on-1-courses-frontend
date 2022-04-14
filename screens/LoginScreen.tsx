import * as React from 'react';
import {
  Text,
  StyleSheet,
  Pressable
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import Colors from "../constants/Colors";
import Input from "../components/Input";
import SubmitButton from "../components/SubmitButton";
import Server from "../constants/Server";
import Errors from "../components/Errors";
import { encode } from "base-64";
import {signedIn, email, password} from "../store/state";
import alert from "../components/alert";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function LoginScreen({navigation}){
  const {
    control,
    handleSubmit,
    formState: {errors, isValid}
  } = useForm({mode: 'onBlur'})

  const onSubmit = (data: FormData) => {
    console.log(data)
    sendForm(data)
  }
  const extractErrors = () => {
    let messages = []
    const errArr = Object.values(errors)
    for (let error of errArr) {
      messages.push(error.message)
    }
    return messages
  }
  const sendForm = async (data) => {
    try {
      const response = await fetch(`${Server.url}/users/login`,{
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic '+ encode(`${data.email}:${data.password}`),
        },
        body: JSON.stringify(data)
      });
      if (response.status === 200) {
        email.set(data.email)
        password.set(data.password)
        signedIn.set(true)
      } else {
        alert("Error", "Invalid credentials")
      }
    } catch (error) {
      alert("Server error", "SERVER ERROR");
    }
  }
  return (
    <SafeAreaView
      style={styles.container}
    >
      <Text style={[styles.text, styles.heading]}>Login</Text>
      <Controller
        control={control}
        name="email"
        render={({field: {onChange, value, onBlur}}) => (
          <Input
            label={"Email"}
            placeholder="Enter email..."
            value={value}
            onBlur={onBlur}
            onChangeText={(value: any) => onChange(value)}
          />
        )}
        rules={{
          required: {
            value: true,
            message: "Email is required"
          },
          pattern: {
            value: /^(.+)@(.+)$/,
            message: "Invalid email format"
          }
        }}
      />
      <Controller
        control={control}
        name="password"
        render={({field: {onChange, value, onBlur}}) => (
          <Input
            label={"Password"}
            placeholder="Enter password ..."
            secureTextEntry={true}
            value={value}
            onBlur={onBlur}
            onChangeText={(value: any) => onChange(value)}
          />
        )}
        rules={{
          required: {
            value: true,
            message: "Password is required"
          },
        }}
      />

      <SubmitButton buttonStyle={{marginHorizontal: 50}} text={"Submit"} onPress={handleSubmit(onSubmit)}/>
      <Pressable style={{marginVertical: 5}} onPress={()=>navigation.navigate("RegisterScreen")}>
        <Text style={styles.link}> Click here to register </Text>
      </Pressable>
      {errors && (
        <Errors errors={extractErrors()}/>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.background,
  },
  text: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: Colors.text,
  },
  heading: {
    lineHeight: 50,
    fontSize: 40,
    textAlign: "center",
    paddingBottom: 5
  },
  link: {
    textDecorationLine: "underline",
    color: Colors.linkBlue,
    textAlign: "center",
    fontSize: 16,
  },
  button: {
    color: Colors.text,
    paddingTop: 5
  }
});
