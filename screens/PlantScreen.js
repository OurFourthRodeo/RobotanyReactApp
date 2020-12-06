import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Button } from 'react-native';
import Axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
//import { Card } from '../components/';

// GET: will recieve data from database
// const PlantData = props => (
//   <Text> 
//     <Link to={"/edit/"+props.dat._id}>Edit</Link>
//   </Text>
// )

export default function PlantScreen() {

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Plant Details</Text>
        </View>
        <Image
          source={{ 
            width: "80%",
            height: 200,
            uri: 'https://picsum.photos/1200/600' 
          }}
          style={styles.image}
        />  

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'stretch',
      justifyContent: 'center',
      flexDirection: 'column',
      margin: 15,
    },
  title:{
      fontWeight:"bold",
      fontSize:30,
      color:"#375177",
      margin: 10,
  },
  logOutButton:{
      alignSelf:"flex-end",
      justifyContent: "flex-end",
  },
  header:{
      //backgroundColor: "white",
      flexDirection: "row",
  },
  image: {
    borderRadius: 5,
    alignSelf: "center",
    marginTop: 5,
  },
});


//componentDidMount() {
  //   Axios.get('https://robotany.queueunderflow.com/')
  //     .then(response => {
  //       this.setState({plantdata: response.data});
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     })
  // }

  // displayData() {
  //   return this.state.plantdata.map(function(currentData, i) {
  //     return <PlantData dat={currentData} key={i} />
  //   })
  // }<Text> {  this.displayData() } </Text>