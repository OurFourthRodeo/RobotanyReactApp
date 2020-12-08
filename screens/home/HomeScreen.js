import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity  } from 'react-native';
import Card from '../../components/Card'
import ImageCard from '../../components/ImageCard'
import { SafeAreaView } from 'react-native-safe-area-context';
import DropDownPicker from 'react-native-dropdown-picker';
import { render } from 'react-dom';
import * as api from "../../services/Auth"
import { AppLoading } from 'expo';


export default function Home(props) {
  const { navigation } = props;
  const { expoPushToken } = props;

  const [labels, setLabels] = useState([{label: "None", value: "0"}]);
  const [plants, setPlants] = useState([{name: "None", mac: "0"}]);
  const [defaultPlant, setDefaultPlant] = useState("0");
  const [selectedPlant, setSelectedPlant] = useState(null);

  useEffect(() => {
    api.registerDevice(expoPushToken);

    api.getPlants().then((plants) => {
      setPlants(plants);
      let temp_labels = []
      plants.forEach(element => {
        temp_labels.push({label: element.name, value: element.mac});
      });
      setLabels(temp_labels);
      setDefaultPlant(temp_labels[0].value);
      setSelectedPlant(plants[0]);
    })}, []);

  return (
    <SafeAreaView style={styles.safearea}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Welcome</Text>
          </View>
          <DropDownPicker
            items={labels}
            defaultValue={defaultPlant}
            containerStyle={{height: 40}}
            style={{backgroundColor: '#fafafa'}}
            dropDownStyle={{backgroundColor: '#fafafa'}}
            onChangeItem={item => {
              let plant = {name: item.label, mac: item.value}
              setSelectedPlant(plant);
            }}
          />
          <TouchableOpacity onPress={() => navigation.navigate("Plant Details")}>
            <Card title="Plant Health" 
              name={selectedPlant ? selectedPlant.name : "No plant"}
              plant_mac={selectedPlant ? selectedPlant.mac : 0} 
              />
          </TouchableOpacity>
          <ImageCard title="Recent Image" plant={selectedPlant ? selectedPlant.mac : null} />
        </View>
    </SafeAreaView>
  );
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
      marginLeft: 10,
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