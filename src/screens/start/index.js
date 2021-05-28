import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';
import styles from './styles';
import Header from "../../composants/Header";
import illustration from "../../../assets/home.png";

export default function index({navigation}) {
    useEffect(() => {
        navigation.navigate('start');
    }, []);

    return (
        <View style="auto">
            <Header navigation={navigation} />
            <View style={{textAlign: "center", marginTop: 100, width: "100%", padding: 10}}>
                <Image source={illustration} style={{width: 300, height: 300, alignSelf: "center"}}/>
                <Text style={{alignSelf: "center"}}>Bienvenue sur BookApp !</Text>
            </View>
            <StatusBar style="auto" />
        </View>
    );
}
