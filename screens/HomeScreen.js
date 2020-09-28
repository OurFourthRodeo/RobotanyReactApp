import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity  } from 'react-native';
import Card from '../components/Card'
import VideoCard from '../components/VideoCard'
import ProgressBar from '../components/ProgressBar'

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome back, [user-name]</Text>
      <Card title="Plant Health" text=" [plant-name] is thriving!" />
      <VideoCard title="Live Video" />

      {/* <Text style={styles.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
      <Text style={styles.description}>Ut in laoreet orci, id fringilla lacus.</Text>
      <Text style={styles.description}>Vestibulum varius mauris in eros scelerisque egestas.</Text>
      <TouchableOpacity style={styles.startBtn}>
        <Text style={styles.startText}>START NOW</Text>
      </TouchableOpacity> */}
    </View>
  );
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
