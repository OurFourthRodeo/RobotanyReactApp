import React, {useState, useEffect} from 'react';
import {Button, Text, StyleSheet, Image, View} from 'react-native';
import Modal from 'react-native-modal';
import DropDownPicker from 'react-native-dropdown-picker';

import * as api from '../services/Auth';

function RemovePlant(props) {
    const [labels, setLabels] = useState([{label: "None", value: "0"}]);
    const [plants, setPlants] = useState([{name: "None", mac: "0"}]);
    const [defaultPlant, setDefaultPlant] = useState("0");
    const [selectedPlant, setSelectedPlant] = useState(null);

    const removePlant = () => {
      props.toggleVisible();
      api.deletePlant(selectedPlant.mac).then(() => props.navigation.navigate('Home', { screen: "Profile" })); 
    }

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
      <Modal
        isVisible={props.visible}
        transparent={true}
        >
          <View style={styles.card}>
            <View style={styles.header}>
              <Text style={{margin: 10, fontWeight:"bold",fontSize:20, alignSelf: "flex-start"}}> Choose a plant to remove: </Text>
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
            <View style={styles.header}>
              <Button title="Remove" onPress={removePlant}/>
              <Button title="Cancel" onPress={props.toggleVisible}/>
            </View>
          </View>
      </Modal>
    );
  }
  
const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      backgroundColor: '#ecf0f1',
    },
    card:{
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.5,
      shadowRadius: 5,  
      elevation: 10,
      backgroundColor:"white",
      borderRadius:15,
      padding:10,
      marginVertical: 10,
    },
    profileImg:{
      width:30,
      height:30,
      borderRadius:50,
      marginRight:5,
    },
    header: {
      flexDirection:"row",
      justifyContent: 'center',
    }
});


export default RemovePlant;