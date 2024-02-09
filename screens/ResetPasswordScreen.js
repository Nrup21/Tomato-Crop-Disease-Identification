import React, { useState } from 'react';
import { View, TextInput, Alert, KeyboardAvoidingView, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';

const ResetPasswordScreen = () =>
{
    const [email, setEmail] = useState('');

    const handleResetPassword = () =>
    {
        // Implement the password reset logic using the `sendPasswordResetEmail` function
        sendPasswordResetEmail(auth, email)
            .then(() =>
            {
                Alert.alert(
                    'Password Reset',
                    "If we find a matching account linked with this email, we'll send password reset link. Please check your inbox and spam folders."
                );
            })
            .catch((error) =>
            {
                Alert.alert('Error', 'Please enter a valid email address.');
            });
    };

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <Image source={require('../assets/TCDI.png')} style={styles.logo} />
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input} autoCapitalize="none"
                    placeholder="Email address"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    keyboardType="email-address"/>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleResetPassword}>
                    <Text style={styles.buttonText}>Reset Password</Text>
                </TouchableOpacity>
            </View>

        </KeyboardAvoidingView>
    );
};

export default ResetPasswordScreen;

const styles = StyleSheet.create({
    container: {
        flex: 0.8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 200,
        height: 200,
        marginTop: 130,
        marginVertical: 40
    },

    inputContainer: {
        width: '80%',
        marginTop: 20
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 10,
        borderColor: 'black',
        borderWidth: 0.8
    },
    buttonContainer: {
        width: '44%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40
    },
    button: {
        backgroundColor: 'green',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: 'green',
        borderWidth: 2
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16
    },
    buttonOutlineText: {
        color: 'green',
        fontWeight: '700',
        fontSize: 16
    }
})