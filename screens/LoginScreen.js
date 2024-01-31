import React, { useState } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async () => {
        try {
            await auth().signInWithEmailAndPassword(email, password);
            // Handle login success
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <View>
            {/* Login Form */}
            <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
            <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
            <Button title="Log In" onPress={handleLogin} />
            {errorMessage ? <Text>{errorMessage}</Text> : null}

            {/* Navigation Links */}
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text>Don't have an account? Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}>
                <Text>Forgot Password?</Text>
            </TouchableOpacity>
        </View>
    );
};

export default LoginScreen;
