import * as React from 'react';
import {Component} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button } from 'react-native';
import 'react-native-gesture-handler';
import AuthenticationContext from '../components/AuthContext';
import axios from 'axios';

const initialState = {
  name: '',
  username: '',
  password: '',
  errors: {},
  isAuthorized: false,
  isLoading: false,
}

export default class CreateAccountScreen extends Component {

  constructor(props) {
    super(props);

    this.onChangePlantName = this.onChangePlantName.bind(this);
    this.onChangePlantType = this.onChangePlantType.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      plant_name: '',
      plant_type: '',
    }
  }

  onChangePlantName(e) {
    this.setState({
      plant_name: e.target.value
    });
  }

  onChangePlantType(e) {
    this.setState({
      plant_type: e.target.value
    });
  }

  onSubmit() {
    //e.preventDefault();

    console.log(`Form submitted`);
    console.log(`Plant Name: ${this.state.plant_name}`);
    console.log(`Plant Type: ${this.state.plant_type}`);

    const newPlant = {
      username: this.state.plant_name,
      email: this.state.plant_type,
      password: "pass"
    }

    axios.post('https://robotany.queueunderflow.com/api/auth/create', newPlant)
        .then(res => console.log(res.data));

    this.setState({
      plant_name: '',
      plant_type: ''
    })

    //navigation.navigate("Dashboard");

  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>add your plant</Text>
        <form onSubmit={this.onSubmit}>
          <View style={styles.inputView} >
            <TextInput  
              style={styles.inputText}
              placeholder="name..." 
              placeholderTextColor="#003f5c"
              value={this.state.plant_name}
              onChangeText={text => this.setState({plant_name: text})} />

          {/* <input type="text"
                 className="form-control"
                 value={this.state.plant_name}
                 onChange={this.onChangePlantName}
          /> */}
          </View>
          <View style={styles.inputView} >
            <TextInput  
              style={styles.inputText}
              placeholder="type..." 
              placeholderTextColor="#003f5c"
              onChangeText={text => this.setState({plant_type: text})}
              value={this.state.plant_type} />
          </View>
          <TouchableOpacity 
            type="submit"
            style={styles.loginBtn} 
            onPress={() => this.onSubmit()} >
            <Text style={styles.loginText}>connect your plant</Text>
         </TouchableOpacity> 
         {/* <input type="submit" value="add plant" className="btn btn-primary" /> */}
        </form>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5', //,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
    fontWeight:"bold",
    fontSize:50,
    color:"#194C14",
    marginBottom:40
  },
  inputView:{
    width:"80%",
    backgroundColor:'white',
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"#003f5c"
  },
  forgot:{
    color:"black",
    fontSize:11
  },
  loginBtn:{
    width:"80%",
    backgroundColor:"#194C14",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
  loginText:{
    color:"white"
  }
});