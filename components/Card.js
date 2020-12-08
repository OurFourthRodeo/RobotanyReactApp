import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import Constants from 'expo-constants';
const profileImg ="https://image.flaticon.com/icons/png/512/628/628283.png"
import { ProgressBar, Colors } from 'react-native-paper';

import { getMoisture } from '../services/Auth';

const Card = (props) => {
  const [moisture, setMoisture] = useState(0.5);

  useEffect(() => {
    getMoisture(props.plant_mac).then((data) => {
      setMoisture(data.moisture);
    })
  })


  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Image style={styles.profileImg} source={{uri: profileImg}} />
          <Text style={{fontWeight:"bold",fontSize:24, alignSelf: "flex-start"}}> {props.title} </Text>
        </View>
        <Text style={{marginTop: 10, marginLeft: 5, alignSelf: "flex-start"}}> {props.name} is thriving! </Text>
        <ProgressBar progress={moisture} color={Colors.red800} />
      </View>
    </View>
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

export default Card;
