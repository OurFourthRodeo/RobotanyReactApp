import React, { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function BotSetup ({navigation}) {

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>WiFi Provisioning</Text>
                </View>         
            </View>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
        flexDirection: 'column',
        margin: 5,
      },
    title:{
        fontWeight:"bold",
        fontSize:30,
        color:"#375177",
        alignSelf:"flex-start",
        margin: 15,
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
  