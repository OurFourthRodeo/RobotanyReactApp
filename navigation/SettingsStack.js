import React, { useContext, useState, useEffect, useRef, useCallback } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ProfileScreen from '../screens/home/ProfileScreen';
import AddPlant from '../screens/home/AddPlant';

const Stack = createStackNavigator();

function SettingsStack() {
    return (
        <Stack.Navigator 
            initialRouteName="Profile"
            screenOptions={{
                headerShown: false }}>
            <Stack.Screen 
                name="Profile"
                children={(props) => <ProfileScreen unregister={props.unregister} props={props}/> }
            />
            <Stack.Screen
                name="AddPlant"
                children={(props) => <AddPlant navigation={props.navigation}/>}
            />
        </Stack.Navigator>
    )
}

export default SettingsStack;