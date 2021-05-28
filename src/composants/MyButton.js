import { StatusBar } from 'expo-status-bar';
import React  from 'react';
import {View, Text, Button} from "react-native";


export default function MyButton(props) {
    return (
        <Button title={props.title} onPress={props.onPress}/>
    );
}
