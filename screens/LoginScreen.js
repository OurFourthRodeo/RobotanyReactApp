import * as React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button } from 'react-native';
import 'react-native-gesture-handler';
import AuthenticationContext from '../components/AuthContext';

const initialState = {
  username: '',
  password: '',
  errors: {},
  isAuthorized: false,
  isLoading: false,
}


// onSubmit() {
//   // //e.preventDefault();

//   // console.log(`Form submitted`);
//   // console.log(`Plant Name: ${this.state.plant_name}`);
//   // console.log(`Plant Type: ${this.state.plant_type}`);

//   const newUser = {
//     username: this.state.plant_name,
//     email: this.state.plant_type,
//     password: "pass"
//   }

//   axios.post('https://robotany.queueunderflow.com/api/auth/create', newPlant)
//       .then(res => console.log(res.data));

//   this.setState({
//     plant_name: '',
//     plant_type: ''
//   })

//   //navigation.navigate("Dashboard");

// }

export default function LoginScreen({ navigation }) {

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { signIn } = React.useContext(AuthenticationContext);

    return (
      <View style={styles.container}>
        <Text style={styles.logo}>the robotany</Text>
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="email..." 
            placeholderTextColor="#003f5c"
            onChangeText={setUsername}/>
        </View>
        <View style={styles.inputView} >
          <TextInput  
            secureTextEntry
            style={styles.inputText}
            placeholder="password..." 
            placeholderTextColor="#003f5c"
            onChangeText={setPassword}
            secureTextEntry />
            {/* onChangeText={text => this.setState({password:text)}/> */}
        </View>
        <TouchableOpacity>
          <Text style={styles.forgot}>forgot password?</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.loginBtn}
          onPress={() => signIn({ username, password })} >
          <Text style={styles.loginText}>login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('CreateAccount')} >
          <Text style={styles.forgot}>create an account</Text>
        </TouchableOpacity>

      </View>
    );
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
    backgroundColor:'#73E367',
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