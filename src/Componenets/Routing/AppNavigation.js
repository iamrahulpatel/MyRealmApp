import 'react-native-gesture-handler';
import React from 'react';

import Signup from '../AuthScreen/Signup';
import Home from '../AuthScreen/Home';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

const AppNavigation = () => {
    return (
        <>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: true }}>
                    <Stack.Screen name="Signup" component={Signup} />
                    <Stack.Screen name="Home" component={Home} />

                </Stack.Navigator>
            </NavigationContainer>
        </>
    );

}


export default AppNavigation;