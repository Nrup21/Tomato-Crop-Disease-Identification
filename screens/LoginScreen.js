import React, { Component, useEffect, useState } from 'react'
import { Text, StyleSheet, View, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import { useNavigation } from '@react-navigation/native'

const LoginScreen = () =>
{
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigation = useNavigation();

    useEffect(() =>
    {
        const unsubscribe = auth.onAuthStateChanged(user =>
        {
            if (user)
            {
                if (user.emailVerified)
                {
                    navigation.replace("Home")
                } else
                {
                    alert('Please verify your email before signing in.');
                }
            }
        })
        return unsubscribe
    }
        , [])

    const handleSignUp = () =>
    {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredentials) =>
            {
                const user = userCredentials.user;
                console.log('Registered with email: ', user.email);
                sendEmailVerification(user)
                    .then(() =>
                    {
                        console.log('Verification email sent!');
                    })
                    .catch((error) =>
                    {
                        console.error('Error sending verification email: ', error);
                    });
            })
            .catch((error) =>
            {
                alert('Error creating user!');
            });
    }


    const handleLogin = () =>
    {
        signInWithEmailAndPassword(auth, email, password)
            .then(userCredentials =>
            {
                const user = userCredentials.user;
                if (user.emailVerified)
                {
                    console.log('Logged in with: ', user.email);
                    navigation.replace("Home");
                } else
                {
                    alert('Please verify your email before signing in.');
                }
            })
            .catch(error => alert(error.message));
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior='padding'>
            <View style={styles.inputContainer}>
                <TextInput placeholder='Email'
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.input} />
                <TextInput placeholder='Password'
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={styles.input}
                    secureTextEntry />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={handleLogin}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleSignUp}
                    style={[styles.button, styles.buttonOutline]}>
                    <Text style={styles.buttonOutlineText}>Register</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        width: '80%'
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40
    },
    button: {
        backgroundColor: '#0782F9',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#0782F9',
        borderWidth: 2
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16
    },
    buttonOutlineText: {
        color: '#0782F9',
        fontWeight: '700',
        fontSize: 16
    }
})