import {TextInput, StyleSheet, View, Text} from "react-native";
import * as React from "react";
import Colors from "../constants/Colors";

export default function Input({placeholder, value, onBlur, onChangeText}) {
    return(
        <View style={styles.container}>
            <Text style={styles.label}>Password</Text>
            <TextInput
                placeholder={placeholder}
                value={value}
                onBlur={onBlur}
                onChangeText={onChangeText}
                style={[styles.text, styles.input]}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 5,
        marginHorizontal: 5,
        paddingVertical: 2,
        paddingHorizontal: 2,
    },
    input:{
        paddingVertical: 2,
        paddingHorizontal: 10,
        alignItems: 'flex-start',
        justifyContent: 'center',
        borderRadius: 20,
        borderWidth: 1
    },
    text: {
        fontSize: 18,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: Colors.text,
        textAlign: "left"
    },
    label: {
        fontSize: 12,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: Colors.tabIconDefault,
        textAlign: "left"
    }
});