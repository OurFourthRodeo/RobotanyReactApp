import React, { useEffect, useState, useContext} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button } from 'react-native';
import 'react-native-gesture-handler';
import { validateAll } from 'indicative/validator';
import AuthenticationContext from '../components/AuthContext';

export default function CreateAccountScreen({ navigation }) {
  const [emailAddress, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [SignUpErrors, setSignUpErrors] = useState({});

  const { signUp } = React.useContext(AuthenticationContext);
  
  const handleSignUp = () => {
    const rules = {
        email: 'required|email',
        password: 'required|string|min:6|max:40|confirmed'
    };

    const data = {
        email: emailAddress,
        username: username,
        password: password,
        password_confirmation: passwordConfirm
    };

    const messages = {
        required: field => `${field} is required`,
        'username.alpha': 'Username contains unallowed characters',
        'email.email': 'Please enter a valid email address',
        'password.min':
            'Password is too short. Must be greater than 6 characters',
        'password.confirmed': 'Passwords do not match'
    };

    validateAll(data, rules, messages)
        .then(() => {
            console.log('success sign in');
            signUp({ emailAddress, password });
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
        <Text style={styles.logo}>sign up</Text>
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="username..." 
            placeholderTextColor="#003f5c"
            onChangeText={setUsername} />
        </View>
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="email..." 
            placeholderTextColor="#003f5c"
            errorMessage={SignUpErrors ? SignUpErrors.email : null}
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
            {/* onChangeText={text => this.setState({password:text)}/> */}
        </View>
        <View style={styles.inputView} >
          <TextInput  
          secureTextEntry
          style={styles.inputText}
          placeholder="confirm password..." 
          placeholderTextColor="#003f5c"
          onChangeText={setPasswordConfirm}
          secureTextEntry />
        </View> 

        <Text style={{ color: 'red', marginLeft: 10, fontSize: 10 }}>
                    {SignUpErrors ? SignUpErrors.password : null}
        </Text>
        <Text style={{ color: 'red', marginLeft: 10, fontSize: 10 }}>
                    {SignUpErrors ? SignUpErrors.email : null}
        </Text>
        
        <TouchableOpacity 
          style={styles.loginBtn} 
          // onPress={() => navigation.navigate('AddPlant')} >
          onPress={() => handleSignUp()} >
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