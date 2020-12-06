import React, { useContext } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from './screens/HomeScreen';
import PlantScreen from './screens/PlantScreen';
import ProfileScreen from './screens/ProfileScreen';

import AuthenticationContext from './components/AuthContext';

const Tab = createMaterialBottomTabNavigator();

// This is the home stack, accessible once you have successfully
// logged in our created an account. 
const createHomeStack = () => {
    const {signOut} = useContext(AuthenticationContext);
  
    return (
        <Tab.Navigator
            initialRouteName="Home Screen"
            barStyle={{ backgroundColor: "white" }}
        >
            <Tab.Screen
                name="Home Screen"
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Details',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="home" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Plant Details"
                component={PlantScreen}
                options={{
                    tabBarLabel: 'Details',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="sprout" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen 
                name="Profile"
                component={ProfileScreen}
                initialParams={{signOut: signOut}}
                options={{
                    title: 'Profile',
                    headerStyle: {backgroundColor: 'black'},
                    headerTintColor: 'white',
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="account" color={color} size={26} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
  };

  export default createHomeStack;