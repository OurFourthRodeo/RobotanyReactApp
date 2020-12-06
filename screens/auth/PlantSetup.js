import React, { useEffect, useState, useContext} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button } from 'react-native';
import 'react-native-gesture-handler';

import * as api from '../../services/Auth';

export default function PlantSetup(props) {
  const { navigation } = props;
  const { navigate } = navigation;

  // state variables
  const [plantName, setName] = useState('');
  const [plantType, setType] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit() {
    console.log(`Form submitted`);
    setLoading(true);

    try {
      let response = await api.addPlant(plantName, plantType);
      setLoading(false);

      navigate('Home');
  
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>add your plant</Text>

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
            placeholder="type..." 
            placeholderTextColor="#003f5c"
            onChangeText={setType} />
        </View>

        <TouchableOpacity 
          type="submit"
          style={styles.loginBtn} 
          onPress={() => navigate('Home')} >
          {/*  onPress={() => onSubmit()} */}
          
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