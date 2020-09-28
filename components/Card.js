import * as React from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Image } from 'react-native';
import Constants from 'expo-constants';
const profileImg ="https://image.flaticon.com/icons/png/512/628/628283.png"
import ProgressBar from './ProgressBar'

const testData = [
  { bgcolor: "#06c258", completed: 90 },
  //{ bgcolor: "#00695c", completed: 30 },
  //{ bgcolor: "#ef6c00", completed: 53 },
];

const Card = (props) => {
    return (
        <TouchableOpacity>
          {/* onPress={() => signIn({ username, password })} > */}
            <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.header}>
                <Image style={styles.profileImg} source={{uri: profileImg}} />
                <Text style={{fontWeight:"bold",fontSize:18, alignSelf: "flex-start"}}> {props.title} </Text>
                </View>
                <Text style={{marginTop: 10, marginLeft: 5, alignSelf: "flex-start"}}> {props.text} </Text>
                {testData.map((item, idx) => (
                  <ProgressBar key={idx} bgcolor={item.bgcolor} completed={item.completed} />
                ))}
            </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      paddingTop: Constants.statusBarHeight,
      backgroundColor: '#ecf0f1',
      padding: 1,
      alignItems:"center",
    },
    card:{
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.5,
      shadowRadius: 5,  
      elevation: 5,
      height: 120,
      width: 435,
      backgroundColor:"white",
      borderRadius:15,
      elevation:10,
      padding:10,
      marginVertical: 10,
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


export default Card;

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