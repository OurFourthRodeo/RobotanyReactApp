import React, { useEffect } from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import { StackActions } from 'react-navigation';

import * as api from "../../services/Auth";

export default function AuthLoading(props) {
    const { navigate } = props.navigation;
    const { navigation } = props;

    useEffect(() => {
        initialize()
    }, []);

    // if user is logged in, navigate to home stack
    async function initialize() {
        try {
            let response = await api.checkLoggedIn();
            console.log(response);
            if (response.error) {
                console.log("not signed in")
                navigation.replace('Auth');
            } else {
                console.log('is signed in')
                navigation.replace('Home');
            }
   
        } catch (e) {
            navigation.replace('Auth');
        }
    }

    return (
        <View style={{
              backgroundColor: "#fff", 
              alignItems: 'center', 
              justifyContent: 'center', 
              flex: 1}}>
            <ActivityIndicator/>
            <Text>{"Loading user data..."}</Text>
        </View>
    );
};