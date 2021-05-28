import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key, value) => {
    try {
        if((typeof value) !== 'string')
            value = JSON.stringify(value);
        await AsyncStorage.setItem(key, value)
    } catch (e) {
        // saving error
    }
}

export const getData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key)
        if(value !== null) {
            // value previously stored
        }
        return value ;
    } catch(e) {
        // error reading value
    }
}