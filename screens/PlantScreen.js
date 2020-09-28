import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button } from 'react-native';

//import { Card } from '../components/';

export default class PlantScreen extends React.Component {
  render(){
    return (
      <View style={styles.container}>
        <Text>You have (undefined) friends.</Text>

      <Button
      title="Add some friends"
      onPress={() =>
        this.props.navigation.navigate('LoginScreen')
      }
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5', //,
    alignItems: 'center',
    justifyContent: 'center'
  },
});