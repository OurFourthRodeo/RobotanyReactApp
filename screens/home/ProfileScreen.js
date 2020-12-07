import React, { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import * as api from '../../services/Auth';

export default function ProfileScreen(props) {
    const { navigate } = props.navigation;

    return (
        <SafeAreaView style={styles.safearea}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Profile</Text>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        api.logout("nothing");
                        navigate('Auth', { screen: "SignIn" }); }}>
                    <Text style={styles.logOutButton}>log out</Text>
                </TouchableOpacity>            
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
    },
    image: {
      borderRadius: 5,
      alignSelf: "center",
      marginTop: 5,
    },
  });
  