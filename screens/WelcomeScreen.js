import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { auth } from '../firebase'
import { signInAnonymously } from 'firebase/auth'

const WelcomeScreen = () =>
{
  const navigation = useNavigation();

  const onContinueAsGuest = () => {
    signInAnonymously(auth)
      .then(() => {
        console.log('User signed in anonymously');
        navigation.navigate('Home');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View>
      <Text> Welcome Screen </Text>
      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.button}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={onContinueAsGuest}>
        <Text style={styles.buttonText}>Continue as Guest</Text>
      </TouchableOpacity>
    </View>
  )
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  button: {
      backgroundColor: 'green',
      width: '60%',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
  },
  buttonText: {
      color: 'white',
      fontWeight: '700',
      fontSize: 16
  }
})