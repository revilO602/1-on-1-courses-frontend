import * as React from 'react';
import {
    Text,
    View,
    StyleSheet,
    Button,
    Alert,
    ScrollView, TextInput, Pressable, KeyboardAvoidingView, Platform,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import Colors from "../constants/Colors";
import Input from "../components/Input";
import SubmitButton from "../components/SubmitButton";
import { useHeaderHeight } from '@react-navigation/elements';
type FormData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export default function RegisterScreen(){
    const insets = useSafeAreaInsets();

    const headerHeight = useHeaderHeight();
    const {
        control,
        handleSubmit,
        formState: {errors, isValid}
    } = useForm({mode: 'onBlur'})

    const onSubmit = (data: FormData) => console.log(data)
    return (
            <KeyboardAwareScrollView
                contentContainerStyle={[styles.container, {paddingTop: insets.top}]}
                enableOnAndroid={true}
                extraScrollHeight={0}
                extraHeight={10}
            >
                <Controller
                    control={control}
                    name="firstName"
                    render={({field: {onChange, value, onBlur}}) => (
                        <Input
                            placeholder="Enter first name..."
                            value={value}
                            onBlur={onBlur}
                            onChangeText={value => onChange(value)}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="firstName"
                    render={({field: {onChange, value, onBlur}}) => (
                        <Input
                            placeholder="Enter first name..."
                            value={value}
                            onBlur={onBlur}
                            onChangeText={value => onChange(value)}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="firstName"
                    render={({field: {onChange, value, onBlur}}) => (
                        <Input
                            placeholder="Enter first name..."
                            value={value}
                            onBlur={onBlur}
                            onChangeText={value => onChange(value)}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="firstName"
                    render={({field: {onChange, value, onBlur}}) => (
                        <Input
                            placeholder="Enter first name..."
                            value={value}
                            onBlur={onBlur}
                            onChangeText={value => onChange(value)}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="firstName"
                    render={({field: {onChange, value, onBlur}}) => (
                        <Input
                            placeholder="Enter first name..."
                            value={value}
                            onBlur={onBlur}
                            onChangeText={value => onChange(value)}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="lastName"
                    render={({field: {onChange, value, onBlur}}) => (
                        <Input
                            placeholder="Enter last name..."
                            value={value}
                            onBlur={onBlur}
                            onChangeText={value => onChange(value)}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="email"
                    render={({field: {onChange, value, onBlur}}) => (
                        <Input
                            placeholder="Enter email..."
                            value={value}
                            onBlur={onBlur}
                            onChangeText={value => onChange(value)}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="password"
                    render={({field: {onChange, value, onBlur}}) => (
                        <Input
                            placeholder="Enter password ..."
                            value={value}
                            onBlur={onBlur}
                            onChangeText={value => onChange(value)}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="confirmPassword"
                    render={({field: {onChange, value, onBlur}}) => (
                        <Input
                            placeholder="Enter password again ..."
                            value={value}
                            onBlur={onBlur}
                            onChangeText={value => onChange(value)}
                        />
                    )}
                />
                <SubmitButton text={"Register"} style={[styles.button]} onPress={handleSubmit(onSubmit)}/>
            </KeyboardAwareScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: Colors.background,
    },
    formContainer: {
        padding: 8,
        flex: 1,
    },
    text: {
        fontSize: 15,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: Colors.text,
    }
});
