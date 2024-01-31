import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import auth from '@react-native-firebase/auth';

const ResetPasswordScreen = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleResetPassword = async () => {
        try {
            await auth().sendPasswordResetEmail(email);
            setMessage('Check your email to reset your password.');
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <View>
            {/* Reset Password Form */}
            <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
            <Button title="Reset Password" onPress={handleResetPassword} />
            {message ? <Text>{message}</Text> : null}
            {errorMessage ? <Text>{errorMessage}</Text> : null}
        </View>
    );
};

export default ResetPasswordScreen;
