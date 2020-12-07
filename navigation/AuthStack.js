import React, { useContext, useMemo, useReducer} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import LoginScreen from '../screens/auth/LoginScreen';
import CreateAccountScreen from '../screens/auth/CreateAccountScreen';
import PlantSetup from '../screens/auth/PlantSetup';
import BotSetup from '../screens/auth/BotSetup';

function SplashScreen() {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
}

const Stack = createStackNavigator();

function createAuthStack() {
    return (
        <Stack.Navigator
            initialRouteName="SignIn"
            screenOptions={{
                headerShown: false}}>
            <Stack.Screen 
                name="SignIn" 
                component={LoginScreen} 
            />
            <Stack.Screen 
                name="SignUp"
                component={CreateAccountScreen}
                options={{
                    title: 'Sign Up',
                }}
            />
            <Stack.Screen 
                name="SetupPlant"
                component={PlantSetup}
            />
            <Stack.Screen
                name="SetupBot"
                component={BotSetup}
            />
            <Stack.Screen 
                name="Splash"
                component={SplashScreen}
            />
        </Stack.Navigator>
    );
};

export default createAuthStack;