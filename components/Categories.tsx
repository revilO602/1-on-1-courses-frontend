import {View, StyleSheet, Text, ActivityIndicator, FlatList} from "react-native";
import {useEffect, useState} from "react";
import Server from "../constants/Server";
import { encode } from "base-64";

export default function Categories({ navigation }) {
    const [isLoading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);

    const fetchCategories = async () => {
        try {
            const response = await fetch(`${Server.url}/courses/categories`,{
                headers: new Headers({
                    'Authorization': 'Basic '+ encode('teacher1@login.sk:heslo'),
                }),
            });
            const json = await response.json();
            setCategories(json);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <View style={styles.container} >
            {isLoading ? <ActivityIndicator/> : (
                <FlatList
                    data={categories}
                    keyExtractor={({ id }, index) => id}
                    renderItem={({ item }) => (
                        <View style={styles.category}><Text> {item.name} </Text></View>
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        padding: '3%',
    },
    category: {
        flexBasis: '33%'
    }
});