import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import {Card, ListItem, Button, Icon, SearchBar} from 'react-native-elements';
import styles from './styles';
import Header from "../../composants/Header";
import getAuthors from "../../../models/authors";
import { getData, storeData } from '../../../utils/StoreManager';

export default function books({route, navigation}) {
    const [ authors, setAuthors] = useState([]);
    const [ favoris, setFavoris] = useState(false);
    const [dataAuthors, setDataAuthors] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        async function fetchData() {
            let authors = await getAuthors();
            setAuthors(authors);
            setDataAuthors(authors);
        }
        fetchData();
    }, []);

    const updateInput = async (input) =>{
        const filtered = dataAuthors.filter(item => {
            return item.fields['Nom complet'].toLowerCase().includes(input.toLowerCase())
        })
        setInput(input);
        setAuthors(filtered);
    }

    return (
        <View style={{
            width: "100%",
            height: "95%",
        }}>
            <StatusBar style="auto "/>
            <Header navigation={navigation} />
            <SearchBar
                placeholder="Entrer le nom de l'auteur que vous cherchez"
                onChangeText={updateInput}
                value={input}
                style={{ width : 1800}}
            />
                <FlatList
                    data={authors}
                    numColumns={1}
                    renderItem={({ item, index, separators }) => (
                    <View style={{width:"100%",padding: 5}}>
                        <Card key={index}>
                            <Card.Title>{item.fields['Nom complet']}</Card.Title>
                            <Card.Divider/>
                            <Card.Image source={{uri: item.fields["Photo"][0]["url"]}} style={{marginBottom: 10}}></Card.Image>
                            <Button onPress={() => navigation.navigate('author', { item })}
                            icon={<Icon name='book' type="font-awesome" color='#ffffff' />}
                            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                            title=' Voir le profil' />
                        </Card>
                    </View>
                  )}
                />
        </View>
    );
}
