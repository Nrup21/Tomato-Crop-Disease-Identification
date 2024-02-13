import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { auth } from '../firebase'
import { signInAnonymously } from 'firebase/auth'
import { LinearGradient } from 'expo-linear-gradient'

const WelcomeScreen = () =>
{
  const navigation = useNavigation();

  const onContinueAsGuest = () =>
  {
    signInAnonymously(auth)
      .then(() =>
      {
        console.log('User signed in anonymously');
        navigation.navigate('Home');
      })
      .catch((error) =>
      {
        console.error(error);
      });
  };

  return (
    <LinearGradient style={{
      flex: 1
    }}
      colors={['#39B68D', '#007260']}>

      <View style={{ flex: 1 }}>

        <View>
          <Image
            source={require("../assets/Welcome_screen_image.png")}
            style={{
              height: 100,
              width: 120,
              borderRadius: 20,
              position: "absolute",
              top: 20,
              transform: [
                { translateX: 40 },
                { translateY: 50 },
                { rotate: "30deg" }
              ]
            }}
          />

          <Image
            source={require("../assets/Welcome_screen_image.png")}
            style={{
              height: 100,
              width: 100,
              borderRadius: 20,
              position: "absolute",
              top: -30,
              left: 130,
              transform: [
                { translateX: 50 },
                { translateY: 50 },
                { rotate: "50deg" }
              ]
            }}
          />

          <Image
            source={require("../assets/Welcome_screen_image.png")}
            style={{
              width: 140,
              height: 100,
              borderRadius: 20,
              position: "absolute",
              top: 150,
              left: -30,
              transform: [
                { translateX: 50 },
                { translateY: 50 },
                { rotate: "5deg" }
              ]
            }}
          />

          <Image
            source={require("../assets/Welcome_screen_image.png")}
            style={{
              height: 200,
              width: 200,
              borderRadius: 20,
              position: "absolute",
              top: 150,
              left: 140,
              transform: [
                { translateX: 50 },
                { translateY: 50 },
                { rotate: "-15deg" }
              ]
            }}
          />
        </View>
        <View style={{
          paddingHorizontal: 22,
          position: "absolute",
          top: 410,
          width: "100%"
        }}>
          <Text style={{
            fontSize: 50,
            fontWeight: 800,
            color: 'white'
          }}>Let's Get</Text>
          <Text style={{
            fontSize: 46,
            fontWeight: 800,
            color: 'white'
          }}>Started</Text>

          <View style={{ marginTop: 10, marginBottom: 40 }}>
            <Text style={{ fontSize: 16, color: 'white', marginVertical: 4 }}>
              <Text style={{ fontWeight: 800 }}>Detect, Prevent, and Treat</Text> tomato crop diseases.</Text>
            <Text style={{
              fontSize: 16,
              color: 'white',
            }}>Remember, a healthy crop is a happy crop!</Text>
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.button}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.button}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.buttonGuest} onPress={onContinueAsGuest}>
            <Text style={{ color: 'white', fontWeight: 700, fontSize: 17, marginTop: 15, textDecorationLine: 'underline' }}>Continue as Guest</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  )
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: 'row',
    paddingHorizontal: 22,
    margin: 'auto',
    // marginTop: 10,
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  buttonGuest: {
    // flexDirection: 'row',
    paddingHorizontal: 22,
    margin: 'auto',
    // marginTop: 10,
    alignItems: 'center',
    width: '100%',
    // justifyContent: 'center',
  },
  button: {
    backgroundColor: 'white',
    width: '60%',
    height: '50%',
    paddingBottom: 16,
    paddingVertical: 10,
    // borderColor: 'black',
    // borderWidth: 2,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5
  },
  buttonText: {
    color: 'black',
    fontWeight: '700',
    fontSize: 16
  }
})