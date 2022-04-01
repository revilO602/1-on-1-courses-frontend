import {View, Text, StyleSheet} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from "../constants/Colors";
export default function TestScreen() {
    return (
        <View style={styles.container} >
            <Text>Hello world</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.background
    },
});