import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import InformationHubScreen from './screens/InformationHubScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';
import CameraComponent from './components/CameraComponent';
import ContactUsScreen from './screens/ContactUsScreen';
import Results from './screens/Results';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: '#2F4F4F',
                tabBarInactiveTintColor: '#2F4F4F',
                tabBarLabelStyle: { fontSize: 12 },
            }}
        >
            <Tab.Screen
                name="HOME"
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Home',
                    headerTitle: 'Home',
                    headerTitleAlign: 'center',
                    tabBarIcon: ({ color, size, focused }) => (
                        <Ionicons
                            name={focused ? 'home' : 'home-outline'}
                            size={size}
                            color={color}
                        />
                    ),
                    headerStyle: {
                        backgroundColor: 'white',
                    }
                }}
            />
            <Tab.Screen
                name="Information Hub"
                component={InformationHubScreen}
                options={{
                    tabBarLabel: 'Information Hub',
                    headerTitleAlign: 'center',
                    tabBarIcon: ({ color, size, focused }) => (
                        <Ionicons
                            name={focused ? 'information-circle' : 'information-circle-outline'}
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="About Us"
                component={ContactUsScreen}
                options={{
                    tabBarLabel: 'About Us',
                    headerTitleAlign: 'center',
                    tabBarIcon: ({ color, size, focused }) => (
                        <Ionicons
                            name={focused ? 'call' : 'call-outline'}
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}


const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator >
                <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name='Reset Password' component={ResetPasswordScreen} />
                <Stack.Screen name="Home" component={BottomTabNavigator} options={{ headerShown: false }} />
                <Stack.Screen name="Information Hub" component={BottomTabNavigator} options={{ headerShown: false }}/>
                <Stack.Screen name="About Us" component={BottomTabNavigator} options={{ headerShown: false }}/>
                <Stack.Screen name="Camera" component={CameraComponent} options={{ headerShown: false }} />
                <Stack.Screen name="Results" component={Results} options={{ headerTitleAlign: 'center', headerBackVisible: false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
