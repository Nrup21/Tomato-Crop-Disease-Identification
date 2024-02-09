import React, { useEffect, useState } from 'react'
import { Text, StyleSheet, View, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import { useNavigation } from '@react-navigation/native'
import { Image } from 'react-native'
import { getDatabase, ref, set } from "firebase/database";

const RegisterScreen = () =>
{
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')

    const navigation = useNavigation();

    const handleSignUp = () =>
    {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredentials) =>
            {
                const user = userCredentials.user;
                console.log('Registered with email: ', user.email);
                navigation.replace('Login');
                sendEmailVerification(user)
                    .then(() =>
                    {
                        console.log('Verification email sent!');
                    })
                    .catch((error) =>
                    {
                        console.error('Error sending verification email: ', error);
                    });

                // Save the first name to the database
                const db = getDatabase();
                set(ref(db, 'users/' + user.uid), {
                    firstName: firstName,
                });
            })
            .catch((error) =>
            {
                alert('Error creating user!');
            });
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior='padding'>
            <Image source={require('../assets/TCDI.png')} style={styles.logo} />
            <View style={styles.inputContainer}>
                <TextInput placeholder='First Name'
                    value={firstName}
                    onChangeText={text => setFirstName(text)}
                    style={styles.input} />
                <TextInput placeholder='Email address'
                    value={email}
                    onChangeText={text => setEmail(text)}
                    keyboardType='email-address'
                    style={styles.input} autoCapitalize="none"/>
                <TextInput placeholder='Password'
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={styles.input} autoCapitalize="none"
                    secureTextEntry />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={handleSignUp}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                onPress={() => navigation.navigate('Login')}>
                <Text style={{ fontWeight: 700, fontSize: 17, marginTop: 15, textDecorationLine: 'underline'}}>Already have an account? Login now.</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen;

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


