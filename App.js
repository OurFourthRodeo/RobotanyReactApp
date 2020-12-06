// imports
import React, {useEffect, useContext, useMemo, useReducer} from 'react';
import { AsyncStorage, Button, Text, TextInput, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import axios from "axios";

// screens
import HomeScreen from './screens/HomeScreen';
import PlantScreen from './screens/PlantScreen';
import ProfileScreen from './screens/ProfileScreen';
import LoginScreen from './screens/LoginScreen';
import CreateAccountScreen from './screens/CreateAccountScreen';
import PlantSetup from './screens/PlantSetup';

// authentication context
import AuthenticationContext from './components/AuthContext';
import {reducer, initialState} from './reducer';
import {stateConditionString} from './components/helpers';
import createHomeStack from './HomeStack';

const Stack = createStackNavigator();

function SplashScreen() {
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps
      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({type: 'RESTORE_TOKEN', token: userToken});
    };
    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {

        if (
          data &&
          data.emailAddress !== undefined &&
          data.password !== undefined
        ) {
          const returningUser = {
            email: data.email,
            password: data.password
          }
          console.log(data.email);
          console.log(data.password);
  
          // check sign-in credentials with database
          axios.post('https://robotany.queueunderflow.com/api/auth/create', returningUser)
              .then(res => console.log(res.data));
              // TODO: reponse fail/succ
            
          // send to HomeScreen
          dispatch({type: 'SIGN_IN', token: 'Token-For-Now'});

        } else {
          dispatch({type: 'TO_SIGNIN_PAGE'});
        }
      },
      signOut: async (data) => {
        dispatch({type: 'SIGN_OUT'});
      },
      signUp: async (data) => {
        if (
          data &&
          data.emailAddress !== undefined &&
          data.password !== undefined
        ) {
          const newUser = {
            username: data.username,
            email: data.emailAddress,
            password: data.password
          }
          console.log(data.username);
          console.log(data.emailAddress);
          console.log(data.password);

          // send new login credentials to database
          axios.post('https://robotany.queueunderflow.com/api/auth/create', newUser)
              .then(res => console.log(res.data));

          // send to PlantSetup page
          dispatch({type: 'SIGNED_UP', token: 'dummy-auth-token'});
        } else {
          dispatch({type: 'TO_SIGNUP_PAGE'});
        }
      },
      setupPlant: async (data) => {
        if (
          data &&
          data.plantName !== undefined &&
          data.plantType !== undefined
        ){ 
        const newPlant = {
          plant_name: data.plantName,
          plant_type: data.plantType,
        }

        // send plant name and type to database
        axios.post('https://robotany.queueunderflow.com/api/data/newplant', newPlant)
            .then(res => console.log(res.data));
    
        dispatch({type: 'SIGN_IN', token: 'Token-For-Now'});
       } else {
          dispatch({type: 'SIGNED_UP', token: 'dummy-auth-token'});
        }
      }
    }),
    []
  );

  const chooseScreen = (state) => {
    let navigateTo = stateConditionString(state);
    let arr = [];

    switch (navigateTo) {
      case 'LOAD_APP':
        arr.push(<Stack.Screen name="Splash" component={SplashScreen} />);
        break;
      case 'LOAD_SIGNUP':
        arr.push(
          <Stack.Screen
            name="SignUp"
            component={CreateAccountScreen}
            options={{
              title: 'Sign Up',
              animationTypeForReplace: state.isSignout ? 'pop' : 'push',
            }}
          />,
        );
        break;
      case 'LOAD_SIGNIN':
        arr.push(<Stack.Screen name="SignIn" component={LoginScreen} />);
        break;
      case 'TO_SETUP_PAGE':
        arr.push(<Stack.Screen name="PlantSetup" component={PlantSetup} />);
        break;
      case 'LOAD_HOME':
        arr.push(
          <Stack.Screen
            name="Home"
            component={createHomeStack}
            options={{
              headerShown: false
            }}
          />,
        );
        break;
      default:
        arr.push(<Stack.Screen name="SignIn" component={SignInScreen} />);
        break;
    }
    return arr[0];
  };

  return (
    <AuthenticationContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {chooseScreen(state)}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthenticationContext.Provider>
  );
}

// {state.isLoading ? (
//   // We haven't finished checking for the token yet
//   <Stack.Screen name="Splash" component={SplashScreen} />
// ) : state.userToken == null ? (
//   <>
//     {/* No token found, user isn't signed in*/}
//     <Stack.Screen
//       name="SignIn"
//       component={LoginScreen}
//       options={{
//         title: 'Sign in',
//         // When logging out, a pop animation feels intuitive
//         animationTypeForReplace: state.isSignout ? 'pop' : 'push',
//       }}
//     />
//     <Stack.Screen
//       name="CreateAccount"
//       component={CreateAccountScreen}
//       options={{
//         title: 'Create an Account'
//       }}
//     />
//     <Stack.Screen 
//       name="AddPlant"
//       component={PlantSetup}
//       options={{ headerShown: true }} />
//   </>
// ) : (
//   <>
//      {/* User is signed in */}
//     <Stack.Screen 
//       name="Dashboard" 
//       component={HomeScreen} 
//       options={{ headerShown: true }} />
//     <Stack.Screen 
//       name="Details" 
//       component={PlantScreen}
//       options={{ headerShown: false }} />

//   </>
// )}