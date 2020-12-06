import React, { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AuthenticationContext from '../components/AuthContext'

export default function ProfileScreen ({navigation}) {
    const {signOut} = useContext(AuthenticationContext);

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Profile</Text>
                </View>
                <TouchableOpacity
                    onPress={() => signOut('data')} >
                    <Text style={styles.logOutButton}>log out</Text>
                </TouchableOpacity>            
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecf0f1',
        alignItems: 'stretch',
        justifyContent: 'center',
        flexDirection: 'column',
        margin: 15,
      },
    title:{
        fontWeight:"bold",
        fontSize:24,
        color:"#375177",
        alignSelf:"flex-start",
        margin: 15,
    },
    logOutButton:{
        color:'#73E367',
        fontSize: '20',
    },
    header:{
        backgroundColor: "white",
        flexDirection: "row",
    },
    image: {
      borderRadius: 5,
      alignSelf: "center",
      marginTop: 5,
    },
  });
  