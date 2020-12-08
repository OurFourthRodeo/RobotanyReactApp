import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, Alert, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SettingsList from 'react-native-settings-list';
const profileImg ="https://image.flaticon.com/icons/png/512/628/628283.png"

import * as api from '../../services/Auth';

export default function ProfileScreen(props) {
    const { navigation, token } = props;

    return (
        <SafeAreaView style={styles.safearea}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Profile</Text>
                </View>
                <View style={styles.container}>
                    <SettingsList borderColor='#c8c7cc' defaultItemSize={50}>
                        <SettingsList.Header headerStyle={{marginTop:0}}/>
                        <SettingsList.Item 
                            title="Add Plant"
                            onPress={() => Alert.alert('nothing')}
                        />    
                        <SettingsList.Item 
                            title="Remove Plant"
                        />
                        <SettingsList.Item 
                            title="Log Out"
                            onPress={() => { 
                                console.log(token);
                                api.unregisterDevice(token).then(() => api.logout())
                                    .then(() => navigation.navigate('Auth', { screen: "SignIn" })); 
                            }}
                        />                   
                    </SettingsList>
                </View>        
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safearea:{
        flex: 1,
    },
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        margin: 5,
    },
    title:{
        fontWeight:"bold",
        fontSize:30,
        color:"#375177",
        margin: 5,
    },
    logOutButton:{
        color:'#73E367',
        fontSize: 20,
        margin: 10,
    },
    header:{
        flexDirection: "row",
        marginLeft: 10,
    },
    iconImg:{
        width:35,
        height:35,
        borderRadius:50,
        marginLeft: 10,
        marginTop: 5,
        marginBottom: 5,
      },
  });
  