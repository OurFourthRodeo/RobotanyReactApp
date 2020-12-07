import React, { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuth } from '../../provider/Auth'

export default function ProfileScreen(props) {
    const { navigate } = props.navigation;
    const { state, handleLogout } = useAuth();
    const user = state.user;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Profile</Text>
            </View>
            <TouchableOpacity
                onPress={() => {
                    handleLogout();
                    navigate('Auth'); }}>
                <Text style={styles.logOutButton}>log out</Text>
            </TouchableOpacity>            
        </View>
    );
}

const styles = StyleSheet.create({
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
        //backgroundColor: "white",
        flexDirection: "row",
    },
    image: {
      borderRadius: 5,
      alignSelf: "center",
      marginTop: 5,
    },
  });
  