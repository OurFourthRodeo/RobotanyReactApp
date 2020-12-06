import React from 'react';
import { StyleSheet, SafeAreaView, Text, Button, View, TouchableOpacity  } from 'react-native';
import Card from '../components/Card'
import ImageCard from '../components/ImageCard'
import AuthenticationContext from '../components/AuthContext';

export default function Home({ navigation }) {
  const { signOut } = React.useContext(AuthenticationContext);

  return (
    <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Welcome back, username</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("Plant Details")}>
            <Card title="Plant Health" name="Charles" />
          </TouchableOpacity>
          <ImageCard title="Live Video" />
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'stretch',
      justifyContent: 'center',
      flexDirection: 'column',
      margin: 5,
    },
  title:{
      fontWeight:"bold",
      fontSize:30,
      color:"#375177",
      //alignSelf:"flex-start",
      margin: 5,
  },
  logOutButton:{
      //alignSelf:"flex-end",
      //justifyContent: "flex-end",
  },
  header:{
    //backgroundColor: "white",
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