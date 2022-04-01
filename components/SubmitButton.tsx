import {View, StyleSheet, Text, Pressable,} from "react-native";
import Colors from "../constants/Colors";

export default function SubmitButton({ onPress, text, style }) {
    return (
        <Pressable style={({ pressed }) => [
            {
                backgroundColor: pressed ? Colors.tabIconSelected : Colors.primary,
            },
            styles.button,
        ]}
                   onPress={onPress} >
            <Text style={[...style, styles.text]}>{text}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        marginVertical: 5,
        marginHorizontal: "20%",
        paddingVertical: 15,
        paddingHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        elevation: 3,
    },
    pressed: {
        backgroundColor: Colors.tabIconDefault
    },
    text: {
        fontSize: 20,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: Colors.text,
    }
});