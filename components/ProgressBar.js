import React from "react";
import { Text, View } from "react-native";
import Axios from "axios";


export default class ProgressBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {moisure_level: []};
  }

  getMoistureLevel() {
    return this.state.moisture_level;
  }

  render() {
    const containerStyles = {
      height: 20,
      width: '80%',
      backgroundColor: "#e0e0de",
      borderRadius: 30,
      marginTop: 20,
      marginLeft: 30,
    }
    
    const fillerStyles = {
      height: '100%',
      width: `${this.getMoistureLevel()}%`,
      backgroundColor: "green",
      borderRadius: 'inherit',
    }
    
    const labelStyles = {
      padding: 5,
      color: 'white',
      justifyContent: 'flex-end',
      fontWeight: 'bold'
    }
    return (
      <View style={containerStyles}>
        <View style={fillerStyles}>
          <Text style={labelStyles}>{`${this.getMoistureLevel()}`}</Text>
        </View>
      </View>
    )
  }
}


  
//export default ProgressBar;