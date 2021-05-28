import { StatusBar } from 'expo-status-bar';
import React  from 'react';
import {View, Text} from "react-native";
import {Icon} from "react-native-elements";

export default function Header(props) {
    return (
        <View style={{width: '100%', paddingTop: 40, flex: 1, minHeight: 80, maxHeight: 80, flexDirection: "row", backgroundColor: "#c39bd3", justifyContent: "space-around"}}>
            <Text onPress={() => props.navigation.navigate('start')}>Accueil</Text>
            <Text onPress={() => props.navigation.navigate('books')}>Livres</Text>
            <Text onPress={() => props.navigation.navigate('authors')}>Auteurs</Text>
        </View>
    );
}
