import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import ProgressBar from '../../components/ProgressBar'
import { SafeAreaView } from 'react-native-safe-area-context';
import DropDownPicker from 'react-native-dropdown-picker';
import * as api from "../../services/Auth"
import { render } from 'react-dom';

const testData = [
  { bgcolor: "#06c258", completed: 60 },
];

export default class PlantScreen extends React.Component {
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

  render() {
    return (
      <SafeAreaView style={styles.safearea}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Plant Details</Text>
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
          <Image
            source={{ 
              uri: 'https://picsum.photos/1200/600' 
            }}
            style={styles.image}
          />  
            {/* {testData.map((item, idx) => (
              <ProgressBar key={idx} bgcolor={item.bgcolor} completed={item.completed} />
            ))} */}
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
  logOutButton:{
      alignSelf:"flex-end",
      justifyContent: "flex-end",
  },
  header:{
      flexDirection: "row",
      marginLeft: 10,
  },
  image: {
    height: 150,
    width: 300,
    borderRadius: 5,
    alignSelf: "center",
    marginTop: 5,
  },
});
