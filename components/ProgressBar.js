import React from "react";
import { Text, View } from "react-native";

const ProgressBar = (props) => {
    const { bgcolor, completed } = props;
  
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
      width: `${completed}%`,
      backgroundColor: bgcolor,
      borderRadius: 'inherit',
      textAlign: 'right'
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
          <Text style={labelStyles}>{`${completed}%`}</Text>
        </View>
      </View>
    );
  };
  
  export default ProgressBar;