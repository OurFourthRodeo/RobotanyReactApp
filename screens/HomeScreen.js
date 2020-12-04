import React from 'react';
import { StyleSheet, Text, Button, View, TouchableOpacity  } from 'react-native';
import Card from '../components/Card'
import ImageCard from '../components/ImageCard'
import AuthenticationContext from '../components/AuthContext';

export default function Home({ navigation }) {
  const { signOut } = React.useContext(AuthenticationContext);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome back, username</Text>
        <Button style={styles.logOutButton} title="Log Out" onPress={() => signOut()} />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("Plant Details")}>
        <Card style={{flex: 1}} title="Plant Health" name="Charles" />
      </TouchableOpacity>
      <ImageCard style={{flex: 1}} title="Live Video" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    alignItems: 'stretch',
    justifyContent: 'center',
    flexDirection: 'column',
    margin: 15,
  },
  title:{
    fontWeight:"bold",
    fontSize:24,
    color:"#375177",
    marginBottom:15,
    alignSelf:"flex-start",
    backgroundColor: "blue",
  },
  logOutButton:{
    alignSelf:"flex-end",
    justifyContent: "flex-end",
  },
  header:{
    flexDirection: "row",
  },
  description:{
    fontSize:12,
    color:"gray",
    padding:5
  },
});
