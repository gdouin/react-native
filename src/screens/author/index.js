import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import 'jquery';
import {StyleSheet, Text, View, Button, Image, FlatList, TouchableOpacity} from 'react-native';
import styles from './styles';
import Header from "../../composants/Header";
import {Card, Divider, Icon} from "react-native-elements";
import {getData, storeData} from "../../../utils/StoreManager";

export default function author({route, navigation}) {
    const { item } = route.params ;
    const [ favoris, setFavoris] = useState(false);
    var titles = JSON.stringify(item.fields['Nom (from Livres)']).replace(/[\[\]']+/g,'').split(",");
    var photos = item.fields['Photo (from Livres)'];
    var prix = item.fields['Prix (from Livres)'];
    var description = JSON.stringify(item.fields['Description (from Livres)']).replace(/[\[\]']+/g,'').split(",");
    var books = [];
    titles.forEach(function(title, index){
        books.push({fields :{'Nom': title, 'Description': description[index], 'Photo': [photos[index]], 'Prix': prix[index], 'Nom complet (from Auteur)': item.fields['Nom complet'], 'Photo (from Auteur)': item.fields['Photo']}})
        }
    )

    useEffect(() => {
        async function getFavoris()  {
            let favoris = await getData('@favoris_author_'+item.id) ;
            setFavoris(favoris);
        }
        getFavoris() ;
    }, []);

    const clicFavoris = async (favoris) => {
        await storeData('@favoris_author_' + item.id, favoris) ;
        setFavoris(favoris);
    }
    return (
        <View style={styles.container}>
            <Header navigation={navigation}/>
                <View style={{marginTop: 20, marginBottom: 20, display: "flex", flex: 1, flexDirection: "row", alignItems: "center", paddingVertical: 50, width: "100%"}}>
                    {item.fields["Photo"] !== undefined && item.fields["Photo"].length > 0 && <Image source={{uri: item.fields["Photo"][0]["url"]}} style={{ width: 100, height: 100, borderRadius: 100, marginHorizontal: 15}} />}
                    <Text style={{fontWeight: "bold"}}>{item.fields["Nom complet"]}</Text>
                    <TouchableOpacity onPress={() => { clicFavoris(!favoris)}}>
                        <Text style={{marginLeft: 5}}>{favoris ? <Icon name='star' type="font-awesome" color='#f4d03f'/> : <Icon name='star-outline' type="FontAwesome" color='#f4d03f'/>}</Text>
                    </TouchableOpacity>
                </View>
                <Divider/>
                <Text style={{marginHorizontal: 20, textAlign: "justify"}}>{item.fields["Description"]}</Text>
                <FlatList style={{marginBottom: 30}} data={books} numColumns={1} renderItem={({ item, index, separators }) => (
                    <View style={{width:300,padding: 5, flexGrow: 1, display: "flex"}} key={index}>
                        <Card>
                            <Card.Image source={{uri: item.fields['Photo'][0]['url']}}></Card.Image>
                            <Card.Divider></Card.Divider>
                            <Card.Title>{item.fields['Nom'].replace(/^"(.+(?="$))"$/, '$1')}</Card.Title>
                            <Card.Divider/>
                            <Button onPress={() => navigation.navigate('book', { item })}
                            icon={<Icon name='book' type="font-awesome" color='#ffffff' />}
                            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                            title=' Voir le livre' />
                        </Card>
                    </View>
                )}/>
        </View>
    );
}