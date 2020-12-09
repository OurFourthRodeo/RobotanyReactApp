import React, {useState} from 'react';
import {Button, Text, StyleSheet, Image, View} from 'react-native';
import Modal from 'react-native-modal';

import * as api from '../services/Auth';

function LogoutPopup(props) {

    const confirmLogout = () => {
      props.toggleVisible();
      props.unregister().then(() => api.logout())
        .then(() => props.navigation.navigate('Auth', { screen: "SignIn" })); 
    }
    return (
      <Modal
        isVisible={props.visible}
        transparent={true}
        >
        {/* <View style={styles.container}> */}
          <View style={styles.card}>
            <View style={styles.header}>
              <Text style={{margin: 10, fontWeight:"bold",fontSize:20, alignSelf: "flex-start"}}> Are you sure you want to log out? </Text>
            </View>
            <View style={styles.header}>
              <Button title="Logout" onPress={confirmLogout}/>
              <Button title="Cancel" onPress={props.toggleVisible}/>
            </View>
          </View>
        {/* </View> */}
      </Modal>
    );
  }
  
const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      backgroundColor: '#ecf0f1',
    },
    card:{
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.5,
      shadowRadius: 5,  
      elevation: 10,
      backgroundColor:"white",
      borderRadius:15,
      padding:10,
      marginVertical: 10,
    },
    profileImg:{
      width:30,
      height:30,
      borderRadius:50,
      marginRight:5,
    },
    header: {
      flexDirection:"row",
      justifyContent: 'center',
    }
});


export default LogoutPopup;