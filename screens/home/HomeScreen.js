import React from 'react';
import { StyleSheet, SafeAreaView, Text, Button, View, TouchableOpacity  } from 'react-native';
import Card from '../../components/Card'
import ImageCard from '../../components/ImageCard'

import { useAuth } from "../../provider/Auth"

export default function Home(props) {
  const { navigate } = props.navigation;

  const { state, handleLogout } = useAuth();
  const user = state.user;

  return (
    <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Welcome</Text>
          </View>
          <TouchableOpacity onPress={() => navigate("Plant Details")}>
            <Card title="Plant Health" name="Charles" />
          </TouchableOpacity>
          <ImageCard title="Recent Image" />
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