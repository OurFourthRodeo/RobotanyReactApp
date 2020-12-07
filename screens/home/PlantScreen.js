import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import ProgressBar from '../../components/ProgressBar'

const testData = [
  { bgcolor: "#06c258", completed: 60 },
];

export default function PlantScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Plant Details</Text>
      </View>
      <Image
        source={{ 
          uri: 'https://picsum.photos/1200/600' 
        }}
        style={styles.image}
      />  
        {testData.map((item, idx) => (
          <ProgressBar key={idx} bgcolor={item.bgcolor} completed={item.completed} />
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
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
      alignSelf:"flex-end",
      justifyContent: "flex-end",
  },
  header:{
      flexDirection: "row",
  },
  image: {
    height: 150,
    width: 300,
    borderRadius: 5,
    alignSelf: "center",
    marginTop: 5,
  },
});
