import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import 'react-native-gesture-handler';
import { validateAll } from 'indicative/validator';

import * as api from "../../services/Auth";
import { useAuth } from "../../provider/Auth";

export default function LoginScreen(props) {
  const { navigation } = props;
  const { navigate } = navigation;

  // variables
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  // sign in and errors
  const [SignUpErrors, setSignUpErrors] = useState({});
  const { handleLogin } = useAuth();

  async function sendToAPI(data) {
    console.log(data.email);
    try {
      let response = await api.signin(data);
      await handleLogin(reponse);

      // check if username is null
      let username = (response.user.username !== null);
      if (username) navigate('Home');
      else navigation.replace('SignIn');

    } catch (error) {
      console.log(error.message);
    }
  }

  const onSubmit = () => {
    const rules = {
        email: 'required|email',
        password: 'required|string|min:6|max:40' 
    };

    const data = {
        email: email,
        password: password
    };

    const messages = {
        required: field => `${field} is required`,
        'username.alpha': 'Username contains unallowed characters',
        'email.email': 'Please enter a valid email address',
        'password.min': 'Wrong Password?'
    };

    validateAll(data, rules, messages)
        .then(() => {
            console.log('success sign in');
            sendToAPI(data);
        })
        .catch(err => {
            const formatError = {};
            err.forEach(err => {
                formatError[err.field] = err.message;
            });
            setSignUpErrors(formatError);
        });
    };

    return (
      <View style={styles.container}>
        <Text style={styles.logo}>the robotany</Text>
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="email..." 
            placeholderTextColor="#003f5c"
            onChangeText={setEmail}/>
        </View>
        <View style={styles.inputView} >
          <TextInput  
            secureTextEntry
            style={styles.inputText}
            placeholder="password..." 
            placeholderTextColor="#003f5c"
            onChangeText={setPassword}
            secureTextEntry />
        </View>

        <TouchableOpacity>
          <Text style={styles.forgot}>forgot password?</Text>
        </TouchableOpacity>

        <Text style={{ color: 'red', marginLeft: 10, fontSize: 10 }}>
                    {SignUpErrors ? SignUpErrors.email : null}
        </Text>
        <Text style={{ color: 'red', marginLeft: 10, fontSize: 10 }}>
                    {SignUpErrors ? SignUpErrors.password : null}
        </Text>

        <TouchableOpacity 
          style={styles.loginBtn}
          onPress={() => navigate('Home')} >
          <Text style={styles.loginText}>login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.replace("SignUp")} >
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