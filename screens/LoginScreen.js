import React, { useEffect, useState } from 'react'
import { Text, StyleSheet, View, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import { useNavigation } from '@react-navigation/native'
import { Image } from 'react-native'

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
            .catch((error) =>
            {
                alert('Please enter correct credentials or verify your email!');
            });
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior='padding'>
            <Image source={require('../assets/TCDI.png')} style={styles.logo} />
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
                {/* <TouchableOpacity
                    onPress={handleSignUp}
                    style={[styles.button, styles.buttonOutline]}>
                    <Text style={styles.buttonOutlineText}>Register</Text>
                </TouchableOpacity> */}
            </View>
        </KeyboardAvoidingView>
    )
}

export default LoginScreen;

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