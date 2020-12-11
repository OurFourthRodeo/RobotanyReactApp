import React, { useEffect, useState, useContext} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button } from 'react-native';
import NetInfo from "@react-native-community/netinfo";

import 'react-native-gesture-handler';

import * as api from '../../services/Auth';

export default function AddPlant(props) {
  const { navigation } = props;

  // state variables
  const [plantName, setName] = useState('');
  const [mac, setMac] = useState('');
  const [ssid, setSSID] = useState('');
  const [wifiPassword, setPassword] = useState('');
  const [unregister, setUnregister] = useState(null)
  const [networkState, setNetState] = useState('')

  async function onSubmit() {
    try {
      // Connected to ESP32 SoftAP
      let response = await api.connectPlant(ssid, wifiPassword);

      // Wait for network change
      setUnregister(NetInfo.addEventListener(addPlantToUser));
  
    } catch (error) {
      setNetState(error);
      console.log("Caught error.")
      console.log(error.message);
    }
  }

  async function addPlantToUser() {
    try{
      // Once Connected to WiFi
      let response = await api.addPlant(plantName, mac);
      navigation.navigate('Profile', {screen: "Profile"});
      unregister();
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>add a new plant</Text>

        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="name..." 
            placeholderTextColor="#003f5c"
            onChangeText={setName} />
        </View>

        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="mac address..." 
            placeholderTextColor="#003f5c"
            onChangeText={setMac} />
        </View>

        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="ssid..." 
            placeholderTextColor="#003f5c"
            onChangeText={setSSID} />
        </View>

        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="password..." 
            placeholderTextColor="#003f5c"
            onChangeText={setPassword} />
        </View>

        <TouchableOpacity 
          type="submit"
          style={styles.loginBtn} 
          onPress={() => onSubmit()}>
          
          <Text style={styles.loginText}>connect your plant</Text>
        </TouchableOpacity> 

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5', //,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
    fontWeight:"bold",
    fontSize:50,
    color:"#194C14",
    marginBottom:40
  },
  inputView:{
    width:"80%",
    backgroundColor:'white',
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"#003f5c"
  },
  forgot:{
    color:"black",
    fontSize:11
  },
  loginBtn:{
    width:"80%",
    backgroundColor:"#194C14",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
  loginText:{
    color:"white"
  }
});