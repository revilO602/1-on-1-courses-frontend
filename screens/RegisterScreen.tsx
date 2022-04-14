import * as React from 'react';
import {
    Text,
    StyleSheet,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import Colors from "../constants/Colors";
import Input from "../components/Input";
import SubmitButton from "../components/SubmitButton";
import Errors from "../components/Errors";
import Server from "../constants/Server";
import alert from "../components/alert";

type FormData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export default function RegisterScreen({navigation}){
    const {
        control,
        handleSubmit,
        formState: {errors, isValid},
        watch
    } = useForm({mode: 'onBlur'})
    const currPassword = watch('password')
    const onSubmit = (data: FormData) => {
        console.log(data)
        sendForm(data)
    }
    const extractFrontendErrors = () => {
        let messages = []
        const errArr = Object.values(errors)
        for (let error of errArr) {
            messages.push(error.message)
        }
        return messages
    }

    const sendForm = async (data) => {
        try {
            const response = await fetch(`${Server.url}/users/register`,{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (response.status === 201) {
                navigation.navigate("LoginScreen")
            } else {
                const json = await response.json()
                let errors = ''
                for (var key of Object.keys(json)) {
                    errors = errors + `${key}: ${json[key]}\n`
                }
                alert("Error", errors)
            }
        } catch (error) {
            alert("Server error", "SERVER ERROR");        }
    }
    return (
            <SafeAreaView
              style={styles.container}
            >
                <Text style={[styles.text, styles.heading]}>Register</Text>
                <Controller
                    control={control}
                    name="firstName"
                    render={({field: {onChange, value, onBlur}}) => (
                        <Input
                            placeholder="Enter first name..."
                            label={"First name"}
                            value={value}
                            onBlur={onBlur}
                            onChangeText={(value: any) => onChange(value)}
                        />
                    )}
                    rules={{
                        required: {
                            value: true,
                            message: "First name is required"
                        }
                    }}
                />
                <Controller
                    control={control}
                    name="lastName"
                    render={({field: {onChange, value, onBlur}}) => (
                        <Input
                            label={"Last name"}
                            placeholder="Enter last name..."
                            value={value}
                            onBlur={onBlur}
                            onChangeText={(value: any) => onChange(value)}
                        />
                    )}
                    rules={{
                        required: {
                            value: true,
                            message: "Last name is required"
                        }
                    }}
                />
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
                        }
                    }}
                />
                <Controller
                    control={control}
                    name="confirmPassword"
                    render={({field: {onChange, value, onBlur}}) => (
                        <Input
                            label={"Password confirmation"}
                            placeholder="Enter password again ..."
                            secureTextEntry={true}
                            value={value}
                            onBlur={onBlur}
                            onChangeText={(value: any) => onChange(value)}
                        />
                    )}
                    rules={{
                        required: {
                            value: true,
                            message: "Password confirmation is required"
                        },
                        validate: value => value === currPassword || "The passwords do not match"
                    }}

                />
                <SubmitButton buttonStyle={{marginHorizontal: 50}} text={"Submit"} onPress={handleSubmit(onSubmit)}/>
                {errors && (
                  <Errors errors={extractFrontendErrors()}/>
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
    button: {
        color: Colors.text,
    }
});
