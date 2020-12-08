import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity  } from 'react-native';
import Card from '../../components/Card'
import ImageCard from '../../components/ImageCard'
import { SafeAreaView } from 'react-native-safe-area-context';
import DropDownPicker from 'react-native-dropdown-picker';
import { render } from 'react-dom';
import * as api from "../../services/Auth"
import { AppLoading } from 'expo';

// notifications
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }), 
});

export default function Home(props) {
  const { navigation } = props;
  const [expoPushToken, setExpoPushToken] = useState('');
  const notificationListener = useRef();
  const responseListener = useRef();
  const [labels, setLabels] = useState([{label: "None", value: "0"}]);
  const [plants, setPlants] = useState([{name: "None", mac: "0"}]);
  const [defaultPlant, setDefaultPlant] = useState("0");
  const [selectedPlant, setSelectedPlant] = useState(null);

  useEffect(() => {
    api.getPlants().then((plants) => {
      setPlants(plants);
      let temp_labels = []
      plants.forEach(element => {
        temp_labels.push({label: element.name, value: element.mac});
      });
      setLabels(temp_labels);
      setDefaultPlant(temp_labels[0].value);
      setSelectedPlant(plants[0]);
    })
    
    // notifications
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    // send device token to API
    api.registerDevice(expoPushToken);
    
    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
    }, []);

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

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
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