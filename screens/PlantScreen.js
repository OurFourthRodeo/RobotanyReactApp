import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button } from 'react-native';
import Axios from 'axios';
//import { Card } from '../components/';

// GET: will recieve data from database

const PlantData = props => (
  <Text> 
    <Link to={"/edit/"+props.dat._id}>Edit</Link>
  </Text>
)
export default class PlantScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {plantdata: []};
  }

  componentDidMount() {
    Axios.get('https://robotany.queueunderflow.com/')
      .then(response => {
        this.setState({plantdata: response.data});
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  displayData() {
    return this.state.plantdata.map(function(currentData, i) {
      return <PlantData dat={currentData} key={i} />
    })
  }

  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Plant Details</Text>
        <Text> {  this.displayData() } </Text>
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