import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// pages
import start from './src/screens/start/index';
import books from './src/screens/books/index';
import book from './src/screens/book/index';
import authors from './src/screens/authors/index';
import author from './src/screens/author/index';

const Stack = createStackNavigator() ;

export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator
				initialRouteName={'Start'}
				screenOptions={{
					headerShown: false
				}}
			>
				<Stack.Screen name={'start'} component={start} />
				<Stack.Screen name={'books'} component={books} />
				<Stack.Screen name={'book'} component={book} />
                <Stack.Screen name={'authors'} component={authors} />
				<Stack.Screen name={'author'} component={author} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}
