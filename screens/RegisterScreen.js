import React, { useEffect, useState } from 'react'
import { Text, StyleSheet, View, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import { useNavigation } from '@react-navigation/native'
import { Image } from 'react-native'
import { getDatabase, ref, set } from "firebase/database";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const RegisterScreen = () =>
{
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [suggestions, setSuggestions] = useState([]);
    const [strength, setStrength] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);


    const navigation = useNavigation();

    useEffect(() =>
    {
        validatePassword(password);
    }, [password]);

    const validatePassword = (input) =>
    {
        let newSuggestions = [];
        let satisfiedConditions = 0;

        if (input.length >= 8)
        {
            satisfiedConditions++;
        } else
        {
            newSuggestions.push('Password should be at least 8 characters long');
        }

        if (/\d/.test(input))
        {
            satisfiedConditions++;
        } else
        {
            newSuggestions.push('Add at least one number');
        }

        if (/[A-Z]/.test(input))
        {
            satisfiedConditions++;
        } else
        {
            newSuggestions.push('Include at least one uppercase letter');
        }

        if (/[a-z]/.test(input))
        {
            satisfiedConditions++;
        } else
        {
            newSuggestions.push('Include at least one lowercase letter');
        }

        if (/[^A-Za-z0-9]/.test(input))
        {
            satisfiedConditions++;
        } else
        {
            newSuggestions.push('Include at least one special character');
        }

        setSuggestions(newSuggestions);

        switch (satisfiedConditions)
        {
            case 5:
                setStrength('Very Strong');
                break;
            case 4:
                setStrength('Strong');
                break;
            case 3:
                setStrength('Moderate');
                break;
            case 2:
                setStrength('Weak');
                break;
            default:
                setStrength('Very Weak');
                break;
        }
    };

    const getColorForStrength = (strength) =>
    {
        switch (strength)
        {
            case 'Very Weak':
                return 'red';
            case 'Weak':
                return '#FF5F1F';
            case 'Moderate':
                return '#F4BB44';
            case 'Strong':
                return '#32CD32';
            case 'Very Strong':
                return 'green';
            default:
                return 'black';
        }
    };


    const toggleShowPassword = () =>
    {
        setShowPassword(!showPassword);
    };

    const handleSignUp = () =>
    {
        // Check if all password validations are met
        if (strength === 'Very Strong')
        {
            // If validations are met, proceed with user registration
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
        } else
        {
            // If password validations are not met, display an error message or handle it accordingly
            alert('Password does not meet the requirements');
        }
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
                    style={styles.input} autoCapitalize="none" />
                <View style={styles.passwordInputContainer}>
                    <TextInput
                        placeholder='Password'
                        value={password}
                        onChangeText={text => setPassword(text)}
                        style={styles.passwordInput}
                        autoCapitalize="none"
                        secureTextEntry={!showPassword}
                        onFocus={() => setIsPasswordFocused(true)}
                        onBlur={() => setIsPasswordFocused(false)}
                    />
                    <MaterialCommunityIcons
                        name={showPassword ? 'eye-off' : 'eye'}
                        size={24}
                        color="#aaa"
                        style={styles.icon}
                        onPress={toggleShowPassword}
                    />
                </View>
                {isPasswordFocused &&
                    <Text style={{ ...styles.strengthText, color: getColorForStrength(strength) }}>
                        Password Strength: {strength}
                    </Text>
                }
                {isPasswordFocused && suggestions.map((suggestion, index) => (
                    <Text key={index} style={styles.suggestionText}>
                        {suggestion}
                    </Text>
                ))}
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
                <Text style={{ fontWeight: 700, fontSize: 17, marginTop: 15, textDecorationLine: 'underline' }}>Already have an account? Login now.</Text>
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
    passwordInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '100%',
    },
    passwordInput: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 10,
        borderColor: 'black',
        borderWidth: 0.8
    },
    icon: {
        position: 'absolute',
        right: 12,
        top: '35%',
        color: '#333',
    },
    buttonContainer: {
        width: '44%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40
    },
    button: {
        backgroundColor: '#2F4F4F',
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
    },
    suggestionText: {
        color: '#FF4433',
    },
    passwordValidatorContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    strengthText: {
        fontWeight: 'bold',
        fontSize: 18,
        // color: '#007700',
    },
    suggestionsText: {
        color: '#000',
        flex: 1,
    },
    strengthMeter: {
        width: '80%',
        height: 20,
        backgroundColor: '#ccc',
        marginTop: 10,
        borderRadius: 10,
        overflow: 'hidden',
    },
})


