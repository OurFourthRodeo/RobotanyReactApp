import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import Constants from 'expo-constants';
import { Video } from 'expo-av';
const profileImg ="https://image.flaticon.com/icons/png/512/628/628283.png";

import { getImage } from '../services/Auth';

const ImageCard = (props) => {
  const [url, setURL] = useState("");

  //console.log(props);
  
  useEffect(() => {
    getImage(props.plant).then((image) => {
      setURL(image.url);
    })
  })
  
  return (
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.header}>
            <Image style={styles.profileImg} source={{uri: profileImg}} />
            <Text style={{fontWeight:"bold",fontSize:24}}> {props.title} </Text>          
          </View>
          {url ? 
          <Image style={styles.image} 
            source={{ uri: url }}/> : 
            <Text>No Image</Text> }
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      backgroundColor: '#ecf0f1',
      paddingTop: 10,
    },
    image: {
      height: 250,
      width: "95%",
      borderRadius: 5,
      alignSelf: "center",
      marginTop: 8,
      resizeMode: 'contain',
    },
    card:{
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.5,
      shadowRadius: 5,  
      elevation: 5,
      backgroundColor:"white",
      borderRadius:15,
      elevation:10,
      padding:10,
      marginVertical: 0
    },
    profileImg:{
      width:30,
      height:30,
      borderRadius:50,
      marginRight:5,
    },
    header: {
      flexDirection:"row",
      //backgroundColor: "blue",
    }
});

export default ImageCard;