import React, { useContext, useState, useEffect, useRef, useCallback } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ProfileScreen from '../screens/home/ProfileScreen';
import AddPlant from '../screens/home/AddPlant';

const Stack = createStackNavigator();

export default function SettingsStack(props) {
    const { unreg } = props;
    const { navigation } = props;

    return (
        <Stack.Navigator 
            initialRouteName="Profile"
            screenOptions={{
                headerShown: false }}>
            <Stack.Screen 
                name="Profile"
                children={props => <ProfileScreen unreg={unreg} navigation={navigation}/> }
            />
            <Stack.Screen
                name="AddPlant"
                children={props => <AddPlant navigation={navigation} />}
            />
        </Stack.Navigator>
    )
}