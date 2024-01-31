import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import auth from '@react-native-firebase/auth';

const SignUpScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSignUp = async () => {
        try {
            await auth().createUserWithEmailAndPassword(email, password);
            // Handle sign-up success
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <View>
            {/* Sign Up Form */}
            <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
            <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
            <Button title="Sign Up" onPress={handleSignUp} />
            {errorMessage ? <Text>{errorMessage}</Text> : null}
        </View>
    );
};

export default SignUpScreen;
