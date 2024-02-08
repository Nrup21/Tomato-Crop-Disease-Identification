import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const WelcomeScreen = () =>
{
  const navigation = useNavigation();

  return (
    <View>
      <Text> Welcome Screen </Text>
      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.button}>
        <Text style={styles.buttonText}>Register</Text>
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