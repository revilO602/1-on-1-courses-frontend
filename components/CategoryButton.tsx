import {View, StyleSheet, Text, Pressable,} from "react-native";
import Colors from "../constants/Colors";

export default function CategoryButton({ navigation, name, id }) {
    const onPress = () =>{
        // go to category courses
    }
    return (
        <Pressable style={({ pressed }) => [
            {
                backgroundColor: pressed ? Colors.tabIconSelected : Colors.primary,
            },
            styles.button,
        ]}
         onPress={onPress} >
            <Text style={styles.text}>{name}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        elevation: 3,
        minWidth: 100,
        minHeight: 100
    },
    pressed: {
        backgroundColor: Colors.tabIconDefault
    },
    text: {
        fontSize: 15,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: Colors.text,
    }
});