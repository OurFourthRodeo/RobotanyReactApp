import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import Constants from 'expo-constants';
const profileImg ="https://image.flaticon.com/icons/png/512/628/628283.png";
const no = "https://www.iconsdb.com/icons/preview/red/cancel-xxl.png";
const yes = "https://cdn3.iconfinder.com/data/icons/flat-actions-icons-9/792/Tick_Mark_Dark-512.png";

import { getMoisture } from '../services/Auth';

const GrowthCard = (props) => {
  const [harvest, setHarvest] = useState(false);
  const [electrode, setElectrode] = useState(false);

  // useEffect(() => {
  //   if (props.plant_mac != 0){
  //     getElectrode(props.plant_mac).then((data) => {
  //       setElectrode(data.electrode);
  //     })
  //     getHarvest(props.plant_mac).then((data) => {
  //       setHarvest(data.harvest);
  //     })
  //   }
  // }, [props.plant_mac])

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Image style={styles.profileImg} source={{uri: profileImg}} />
          <Text style={styles.title}> Plant Growth </Text>
        </View>
        <View style={styles.row}>
          { {electrode} ? 
            <>
              <Image style={styles.yes_icon} source={{uri: yes}} />
              <Text style={styles.body}> ready for electrodes! </Text>
            </>
          : 
            <>
              <Image style={styles.no_icon} source={{uri: no}} />
              <Text style={styles.body}> not ready for electrodes. </Text> 
            </> }
        </View>
        <View style={styles.row}>
          { {harvest} ? 
            <>
              <Image style={styles.no_icon} source={{uri: yes}} />
              <Text style={styles.body}> ready for harvest. </Text>
            </>
          : 
            <>
              <Image style={styles.no_icon} source={{uri: no}} />
              <Text style={styles.body}> not ready for harvest. </Text> )}
           </> }
        </View>
        <Text style={{marginTop: 0, marginLeft: 5, alignSelf: "center"}}></Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      backgroundColor: '#ecf0f1',
    },
    body: {
      marginTop: 15, 
      marginLeft: 5, 
      alignSelf: "center",
      fontSize: 17,
    },
    card:{
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.5,
      shadowRadius: 5,  
      elevation: 10,
      backgroundColor:"white",
      borderRadius:15,
      padding: 10,
      marginVertical: 10,
    },
    profileImg:{
      width:30,
      height:30,
      borderRadius:50,
      marginRight:5,
    },
    yes_icon: {
      width: 30,
      height: 30,
      borderRadius: 50,
      marginTop: 15,
      marginLeft: 20,
      marginRight: 5,
    },
    no_icon: {
      width: 26,
      height: 26,
      borderRadius: 50,
      marginTop: 15,
      marginLeft: 22,
      marginRight: 6,
    },
    header: {
      flexDirection:"row",
    },
    row: {
      flexDirection:"row",
      marginLeft: 15,
    },
    title: {
      fontWeight:"bold",
      fontSize:24, 
      alignSelf: "flex-start",
    }
});

export default GrowthCard;
