import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {StyleSheet, Text, View, FlatList, Image, ViewComponent} from 'react-native';
import { Card, ListItem, Button, Icon, SearchBar } from 'react-native-elements';
import Header from "../../composants/Header";
import getBooks from "../../../models/books";

export default function books({route, navigation}) {
    const [ books, setBooks] = useState([]);
    const [dataBooks, setDataBooks] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        async function fetchData()  {
            let books = await getBooks() ;
            setBooks(books);
            setDataBooks(books)
        }
        fetchData() ;
    }, []);

    const updateInput = async (input) =>{
        const filtered = dataBooks.filter(item => {
            return item.fields['Nom'].toLowerCase().includes(input.toLowerCase())
        })
        setInput(input);
        setBooks(filtered);
    }

    return (
        <View style={{
            width: "100%",
            height: "95%",
           }}>
            <StatusBar style="auto"/>
            <Header navigation={navigation} />
            <SearchBar
                placeholder="Entrer le nom du livre que vous cherchez"
                onChangeText={updateInput}
                value={input}
                style={{ width : 1800}}
            />
               <FlatList
                    data={books}
                    numColumns={1}
                    renderItem={({ item, index, separators }) => (
                    <View style={{width:"100%",padding: 5}}  key={index}>
                        <Card>
                            <Card.Title>{item.fields['Nom']}</Card.Title>
                            <Card.Divider/>
                            {item.fields["Photo"] !== undefined && item.fields["Photo"].length > 0 && <Card.Image source={{uri: item.fields["Photo"][0]["url"]}} style={{marginBottom:10}}></Card.Image> }
                            <View style={{display: "flex", flex: 1, flexDirection: "row", justifyContent: "space-between"}}>
                                <Text style={{fontWeight : "bold"}}>{item.fields['Nom complet (from Auteur)']}</Text>
                                <Text style={{marginBottom: 10}}>{item.fields['Prix']}€</Text>
                            </View>
                            <Card.Divider/>
                            <Text style={{flex: 1, marginBottom: 10}} numberOfLines={4}>{item.fields['Description']}</Text>
                            <Button onPress={() => navigation.navigate('book', { item })}
                            icon={<Icon name='book' type="font-awesome" color='#ffffff' />}
                            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                            title=' Voir' />
                        </Card>
                    </View>
                  )}
                />

        </View>
    );
}
