import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';

const Stack = createNativeStackNavigator();

const App = () =>
{
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Welcome" component={WelcomeScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name='ResetPassword' component={ResetPasswordScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
