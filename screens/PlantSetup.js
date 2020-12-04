import React, { useEffect, useState, useContext} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button } from 'react-native';
import 'react-native-gesture-handler';
import AuthenticationContext from '../components/AuthContext';

// POST: will post plant credentials to database

export default function PlantSetup({ navigation }) {
  const [plantName, setName] = useState('');
  const [plantType, setType] = useState('');

  const { setupPlant } = React.useContext(AuthenticationContext);

  const onSubmit = () => {
    console.log(`Form submitted`);
    console.log(`Plant Name: ${plantName}`);
    console.log(`Plant Type: ${plantType}`);

    setupPlant({plantName, plantType});
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
          onPress={() => onSubmit()} >
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