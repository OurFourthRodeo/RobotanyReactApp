import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity  } from 'react-native';
import Card from '../components/Card'
import VideoCard from '../components/VideoCard'
import ProgressBar from '../components/ProgressBar'

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome back, username</Text>
      <Card title="Plant Health" name="Charles" screen="Details" nav={navigation} />
      <VideoCard title="Live Video" />
    </View>
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
    //borderRadius:50,
    padding:10,
    width:"50%",
    alignItems:"center",
    marginTop:50
  },
  startText:{
    color:"white"
  }
});
