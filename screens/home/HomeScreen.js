import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity  } from 'react-native';
import Card from '../../components/Card'
import ImageCard from '../../components/ImageCard'
import { SafeAreaView } from 'react-native-safe-area-context';
import { render } from 'react-dom';
import * as api from "../../services/Auth"
import { AppLoading } from 'expo';

export default class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }

  componentDidMount(){
    api.getPlants().then((plants) => {
      this.setState({
        plants
      })
    })
  }

  // add new device
  // get all plants

  render() {
    return (
      <SafeAreaView style={styles.safearea}>
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.title}>Welcome</Text>
            </View>
            <TouchableOpacity onPress={() => this.props.navigation.navigate("Plant Details")}>
              <Card title="Plant Health" 
                name={this.state.plants ? this.state.plants[0].name : "No plant"}
                plant_mac={0} 
                />
            </TouchableOpacity>
            <ImageCard title="Recent Image" plant={this.state.plants ? this.state.plants[0].mac : null} />
          </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safearea:{
    flex: 1,
  },
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
  header:{
    alignContent: "space-between",
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    borderRadius: 5,
    alignSelf: "center",
    marginTop: 5,
  },
});