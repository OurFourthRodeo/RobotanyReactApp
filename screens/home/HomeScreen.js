import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity  } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DropDownPicker from 'react-native-dropdown-picker';
import * as api from "../../services/Auth"

import Card from '../../components/Card';
import ImageCard from '../../components/ImageCard';
import GrowthCard from '../../components/GrowthCard';

export default function Home(props) {
  const { navigation } = props;

  const [labels, setLabels] = useState([{label: "None", value: "0"}]);
  const [plants, setPlants] = useState([{name: "None", mac: "0"}]);
  const [defaultPlant, setDefaultPlant] = useState("0");
  const [selectedPlant, setSelectedPlant] = useState(null);

  useEffect(() => {
    api.getPlants().then((plants) => {
      if (plants) {
        setPlants(plants);
        let temp_labels = []
        plants.forEach(element => {
          temp_labels.push({label: element.name, value: element.mac});
        });
        if (plants.length > 0) {
          setLabels(temp_labels);
          setDefaultPlant(temp_labels[0].value);
          setSelectedPlant(plants[0]);
        } else {
          setLabels([{label: "None", value: "0"}]);
          setDefaultPlant("0");
          setSelectedPlant(null);
        }
      }
    })}, []);

  return (
    <SafeAreaView style={styles.safearea}>
      <ScrollView>
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
              plant_mac={selectedPlant ? selectedPlant.mac : 0} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Plant Details")}>
            <GrowthCard name={selectedPlant ? selectedPlant.name : "Select a plant"}
                plant_mac={selectedPlant ? selectedPlant.mac : 0} />
          </TouchableOpacity>

          <ImageCard title="Recent Image" plant={selectedPlant ? selectedPlant.mac : null} />
        </View>
      </ScrollView>
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