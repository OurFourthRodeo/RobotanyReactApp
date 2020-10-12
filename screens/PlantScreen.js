import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button } from 'react-native';
//import { Card } from '../components/';

export default class PlantScreen extends React.Component {
  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Plant Details</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  header:{
    fontWeight:"bold",
    fontSize:24,
    color:"#375177",
    marginBottom:15,
    alignSelf:"center"
  },
  description:{
    fontSize:12,
    color:"gray",
    padding:5
  },
  startBtn:{
    backgroundColor:"#90bdff",
    borderRadius:50,
    padding:10,
    width:"50%",
    alignItems:"center",
    marginTop:50
  },
  startText:{
    color:"white"
  }
});