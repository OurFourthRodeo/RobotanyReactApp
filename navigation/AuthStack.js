import React, { useContext, useMemo, useReducer} from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import LoginScreen from '../screens/auth/LoginScreen';
import CreateAccountScreen from '../screens/auth/CreateAccountScreen';
import PlantSetup from '../screens/auth/PlantSetup';
import BotSetup from '../screens/auth/BotSetup';

function SplashScreen() {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
}

const createAuthStack = createStackNavigator(
    {
        SignUp: CreateAccountScreen,
        SignIn: LoginScreen,
        SetupPlant: PlantSetup,
        SetupBot: BotSetup
    },
    {
        initialRouteName: 'SignIn'
    }
);

export default createAuthStack;
// const createAuthStack = () => {

//     return (
//         <Stack.Navigator>
//             <Stack.Screen 
//                 name="SignIn" 
//                 component={LoginScreen} 
//             />
//             <Stack.Screen 
//                 name="SignUp"
//                 component={CreateAccountScreen}
//                 options={{
//                     title: 'Sign Up',
//                 }}
//             />
//             <Stack.Screen 
//                 name="PlantSetup"
//                 component={PlantSetup}
//             />
//             <Stack.Screen
//                 name="BotSetup"
//                 component={BotSetup}
//             />
//             <Stack.Screen 
//                 name="Splash"
//                 component={SplashScreen}
//             />
//         </Stack.Navigator>
//     );
// }

// export default createAuthStack;