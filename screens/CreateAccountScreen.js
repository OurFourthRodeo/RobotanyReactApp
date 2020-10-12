import * as React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button } from 'react-native';
import 'react-native-gesture-handler';
import AuthenticationContext from '../components/AuthContext';

const initialState = {
  name: '',
  username: '',
  password: '',
  errors: {},
  isAuthorized: false,
  isLoading: false,
}

export default function CreateAccountScreen({ navigation }) {

  const [name, setName] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { signUp } = React.useContext(AuthenticationContext);

    return (
      <View style={styles.container}>
        <Text style={styles.logo}>sign up</Text>
        <View style={styles.inputView} >
          <TextInput  
            secureTextEntry
            style={styles.inputText}
            placeholder="name..." 
            placeholderTextColor="#003f5c"
            onChangeText={setName}
            secureTextEntry />
        </View>
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
  
        <TouchableOpacity 
          style={styles.loginBtn} 
          onPress={() => signUp({ username, password })} >
          <Text style={styles.loginText}>connect your plant</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('SignIn')} >
          <Text style={styles.forgot}>already have an account? sign-in</Text>
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