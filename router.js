import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

// import routes
import createAuthStack from './navigation/AuthStack';
import createHomeStack from './navigation/HomeStack';

import AuthLoading from './screens/auth/AuthLoading';
import AuthProvider from './provider/Auth';

const AppStack = createStackNavigator();

export default function Router(props) {
    return (
        <AuthProvider>
            <NavigationContainer>
                <AppStack.Navigator 
                    initialRouteName="Loading"
                    screenOptions={{
                        headerShown: false}}>
                    <AppStack.Screen name="Auth" component={createAuthStack}/>
                    <AppStack.Screen name="Home" component={createHomeStack}/>
                    <AppStack.Screen name="Loading" component={AuthLoading}/>
                </AppStack.Navigator>
            </NavigationContainer>
        </AuthProvider>
    );
}