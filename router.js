import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';

// import routes
import createAuthStack from './navigation/AuthStack';
import createHomeStack from './navigation/HomeStack';

import AuthLoading from './screens/auth/AuthLoading';
import AuthProvider from './provider/Auth';

const AppStack = createSwitchNavigator(
    {
        Loading: AuthLoading,
        Auth: createAuthStack,
        Home: createHomeStack,
    },
    { initialRouteName: 'Home' }
);

const Navigator = createAppContainer(AppStack);

export default function Router(props) {
    return (
        <AuthProvider>
            <Navigator/>
        </AuthProvider>
    );
}