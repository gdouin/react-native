import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Button, Image, Linking, TouchableOpacity } from 'react-native';
import Header from "../../composants/Header";
import { getData, storeData } from '../../../utils/StoreManager';
import {Card, Icon, Divider} from "react-native-elements";

export default function book({route, navigation}) {
    const { item } = route.params ;
    const [ favoris, setFavoris] = useState(false);

    useEffect(() => {
        async function getFavoris()  {
            let favoris = await getData('@favoris_book_'+item.id) ;
            setFavoris(favoris);
        }
        getFavoris() ;
    }, []);

    const clicFavoris = async (favoris) => {
        await storeData('@favoris_book_' + item.id, favoris) ;
        setFavoris(favoris);
    }

    return (
        <View>
            <Header navigation={navigation} />
            <ScrollView>
                <View style={{marginTop: 10, marginBottom:20}}>
                    <Card>
                        <View style={{display: "flex", flex: 1, flexDirection: "row", alignSelf: "center"}}>
                            <Card.Title>{item.fields["Nom"].replace(/^"(.+(?="$))"$/, '$1')}</Card.Title>
                            <TouchableOpacity onPress={() => { clicFavoris(!favoris)}}>
                                <Text style={{ textAlign: "center", marginLeft: 10}}>{favoris ? <Icon name='star' type="font-awesome" color='#f4d03f'/> : <Icon name='star-outline' type="FontAwesome" color='#f4d03f'/>}</Text>
                            </TouchableOpacity>
                        </View>

                        <Card.Divider/>
                        <Card.Image source={{uri: item.fields["Photo"][0]["url"]}}></Card.Image>
                        <Card.Divider/>
                        <View style={{display: "flex", flex: 1, flexDirection: "row", justifyContent: "space-between"}}>
                            <Text style={{fontWeight : "bold"}}>{item.fields['Nom complet (from Auteur)']}</Text>
                            <Text style={{marginBottom: 10}}>{item.fields['Prix']}€</Text>
                        </View>
                        <Text style={{marginBottom: 10}}>{item.fields["Description"].replace(/^"(.+(?="$))"$/, '$1').replace(/\\n/g, '\n')}</Text>
                        <Text style={{textAlign: "center"}} onPress={() => Linking.openURL( item.fields["URL"])}>Visiter la page Wikipédia</Text>
                        <Divider style={{marginVertical: 10}}/>
                        <View style={{display: "flex", flex: 1, flexDirection: "row", alignItems: "center", width: "60%", justifyContent: "space-between", alignSelf: "center"}}>
                            {item.fields["Photo (from Auteur)"] !== undefined && item.fields["Photo (from Auteur)"].length > 0 && <Image source={{uri: item.fields["Photo (from Auteur)"][0]["url"]}} style={{ width: 100, height: 100, borderRadius: 100}} />}
                            <Text style={{fontWeight: "bold", textAlign: "center"}}>{item.fields["Nom complet (from Auteur)"]}</Text>
                        </View>
                    </Card>
                </View>
            </ScrollView>
        </View>
    );
}
