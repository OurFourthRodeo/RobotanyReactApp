import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import Constants from 'expo-constants';
import { Video } from 'expo-av';
const profileImg ="https://image.flaticon.com/icons/png/512/628/628283.png"

const VideoCard = (props) => {
    return (
        <View style={styles.container}>
          <View style={styles.card}>
            <View style={styles.header}>
              <Image style={styles.profileImg} source={{uri: profileImg}} />
              <Text style={{fontWeight:"bold",fontSize:18}}> {props.title} </Text>          
            </View>
            <Video
                source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
                rate={1.0}
                volume={1.0}
                isMuted={false}
                resizeMode="cover"
                shouldPlay
                isLooping
                style={styles.video}
              />  
          </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      paddingTop: Constants.statusBarHeight,
      backgroundColor: '#ecf0f1',
      flex: 1,
      //padding: 1,
      //alignItems:"center",
    },
    video: {
      //height: 200,
      //width: 330,
      borderRadius: 5,
      alignSelf: "center",
      marginTop: 5,
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
      marginRight:10,
    },
    header: {
      flexDirection:"row",
    }
});


export default VideoCard;

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       justifyContent: 'center',
//       paddingTop: Constants.statusBarHeight,
//       backgroundColor: '#ecf0f1',
//       padding: 8,
//       alignItems:"center"
//     },
//     card:{
//       height:150,
//       width:"80%",
//       backgroundColor:"white",
//       borderRadius:15,
//       elevation:10,
//       padding:10
//     },
//     profileImg:{
//       width:30,
//       height:30,
//       borderRadius:50,
//       marginRight:10,
//     },
//     header: {
//       flexDirection:"row",
//     }
// });