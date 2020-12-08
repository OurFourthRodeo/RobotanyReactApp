import React, { useContext, useState, useEffect, useRef } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from '../screens/home/HomeScreen';
import PlantScreen from '../screens/home/PlantScreen';
import ProfileScreen from '../screens/home/ProfileScreen';

// notifications
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

import * as api from '../services/Auth';

const Tab = createMaterialBottomTabNavigator();

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }), 
});

// This is the home stack, accessible once you have successfully
// logged in our created an account. 
function createHomeStack() {
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        // notifications
        registerForPushNotificationsAsync().then(token => {
          setExpoPushToken(token);
          api.registerDevice(token);
        });
    
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
          setNotification(notification);
        });
    
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
          console.log(response);
        });

        return () => {
          Notifications.removeNotificationSubscription(notificationListener);
          Notifications.removeNotificationSubscription(responseListener);
        };
    }, []);

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
                children={expoPushToken => <ProfileScreen token={expoPushToken}/>}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="account" color={color} size={26} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;

    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    return token;
  }

  export default createHomeStack;