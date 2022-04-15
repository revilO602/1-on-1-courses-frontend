import {View, StyleSheet, Text, ActivityIndicator, FlatList} from "react-native";
import {useEffect, useState} from "react";
import Server from "../constants/Server";
import { encode } from "base-64";
import CategoryButton from "./CategoryButton";
import { email, password} from "../store/state";

export default function Categories({ navigation }) {
    const [isLoading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);

    const fetchCategories = async () => {
        try {
            const response = await fetch(`${Server.url}/courses/categories`,{
                headers: new Headers({
                    'Authorization': 'Basic '+ encode(`${email.get()}:${password.get()}`),
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
                    numColumns={3}
                    data={categories}
                    keyExtractor={({ id }, index) => id}
                    renderItem={({ item }) => (
                        <CategoryButton navigation={navigation} id={item.id} name={item.name}/>
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: '3%',
    },
});
