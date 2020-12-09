import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SettingsList from 'react-native-settings-list';

import LogoutPopup from '../../components/LogoutPopup';
import RemovePlant from '../../components/RemovePlant';

import * as api from '../../services/Auth';

export default function ProfileScreen(screenProps) {
    const { unreg } = screenProps;
    const { navigation } = screenProps;
    const [visible, setVisible] = useState(false);
    const [removeVisible, setRemoveVisible] = useState(false);

    // toggles logout popup visibility
    const toggleVisible = () => { setVisible(!visible) };
    // toggles removePlant popup visibility
    const toggleRemoveVisible = () => { setRemoveVisible(!removeVisible) };

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
                            onPress={() => {
                                console.log(screenProps);
                                navigation.navigate("AddPlant");
                            }}
                        />    
                        <SettingsList.Item 
                            title="Remove Plant"
                            onPress={toggleRemoveVisible}
                        />
                        <SettingsList.Item 
                            title="Log Out"
                            onPress={toggleVisible}
                            />                   
                    </SettingsList>
                    <LogoutPopup unregister={unreg} navigation={navigation} visible={visible} toggleVisible={toggleVisible}/>
                    <RemovePlant navigation={navigation} visible={removeVisible} toggleVisible={toggleRemoveVisible}/>
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
  