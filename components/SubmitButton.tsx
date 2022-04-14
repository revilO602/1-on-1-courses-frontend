import {StyleSheet, Text, Pressable,} from "react-native";
import Colors from "../constants/Colors";

export default function SubmitButton({ onPress, text, buttonStyle=null, textStyle=null }) {
    return (
        <Pressable style={({ pressed }) => [
            {
                backgroundColor: pressed ? Colors.tabIconSelected : Colors.primary,
            },
            styles.button,
            buttonStyle
        ]}
                   onPress={onPress} >
            <Text style={[styles.text, textStyle]}>{text}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        marginVertical: 5,
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
