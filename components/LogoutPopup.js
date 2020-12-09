import React, {useState} from 'react';
import {Button, Text, StyleSheet, Image, View} from 'react-native';
import Modal from 'react-native-modal';

function LogoutPopup(props) {

    console.log(props);
    return (
      <Modal
        isVisible={props.visible}
        >
        <View style={styles.container}>
          <View style={styles.card}>
            <View style={styles.header}>
              <Text style={{fontWeight:"bold",fontSize:24, alignSelf: "flex-start"}}> Logout </Text>
            </View>
            <Text style={{marginTop: 10, marginLeft: 5, alignSelf: "center"}}> yay </Text>
            <Text style={{marginTop: 10, marginLeft: 5, alignSelf: "center"}}>Hello</Text>
            <Button title="LOG OUT" onPress={props.toggleVisible}/>
          </View>
        </View>
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
    }
});


export default LogoutPopup;