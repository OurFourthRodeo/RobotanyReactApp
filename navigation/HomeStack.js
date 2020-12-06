import React, { useContext } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from '../screens/home/HomeScreen';
import PlantScreen from '../screens/home/PlantScreen';
import ProfileScreen from '../screens/home/ProfileScreen';

const Tab = createMaterialBottomTabNavigator();

// This is the home stack, accessible once you have successfully
// logged in our created an account. 
function createHomeStack() {

    return (
        <NavigationContainer>
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
        </NavigationContainer>
    );
  };

  export default createHomeStack;