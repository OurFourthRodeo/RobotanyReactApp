import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity  } from 'react-native';
import Card from '../../components/Card'
import ImageCard from '../../components/ImageCard'
import { SafeAreaView } from 'react-native-safe-area-context';
import DropDownPicker from 'react-native-dropdown-picker';
import { render } from 'react-dom';
import * as api from "../../services/Auth"
import { AppLoading } from 'expo';

export default class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        labels: [{label: "None", value: "0"}],
        defaultPlant: "0",
        selectedPlant: null
    }
  }

  componentDidMount(){
    api.getPlants().then((plants) => {
      let labels = []
      plants.forEach(element => {
        labels.push({label: element.name, value: element.mac});
      });
      let defaultPlant = labels[0].value
      let selectedPlant = plants[0];
      this.setState({
        plants,
        labels,
        defaultPlant,
        selectedPlant
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
            <DropDownPicker
              items={this.state.labels}
              defaultValue={this.state.defaultPlant}
              containerStyle={{height: 40}}
              style={{backgroundColor: '#fafafa'}}
              dropDownStyle={{backgroundColor: '#fafafa'}}
              onChangeItem={item => {
                let plant = {name: item.label, mac: item.value}
                this.setState({
                  selectedPlant: plant
                })
              }}
            />
            <TouchableOpacity onPress={() => this.props.navigation.navigate("Plant Details")}>
              <Card title="Plant Health" 
                name={this.state.selectedPlant ? this.state.selectedPlant.name : "No plant"}
                plant_mac={this.state.selectedPlant ? this.state.selectedPlant.mac : 0} 
                />
            </TouchableOpacity>
            <ImageCard title="Recent Image" plant={this.state.selectedPlant ? this.state.selectedPlant.mac : null} />
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