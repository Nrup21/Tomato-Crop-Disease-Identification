import React, { useState } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
      // Handle login success
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleSignUp = () => {
    // Navigate to SignUp Screen
    navigation.navigate('SignUp');
  };

  const handleResetPassword = () => {
    // Navigate to ResetPassword Screen
    navigation.navigate('ResetPassword');
  };

  return (
    <View>
      {/* Email and Password Input Fields */}
      {/* Login Button */}
      <Button title="Log In" onPress={handleLogin} />

      {/* Sign Up Navigation */}
      <TouchableOpacity onPress={handleSignUp}>
        <Text>Don't have an account? Sign Up</Text>
      </TouchableOpacity>

      {/* Password Reset Navigation */}
      <TouchableOpacity onPress={handleResetPassword}>
        <Text>Forgot Password?</Text>
      </TouchableOpacity>

      {errorMessage ? <Text>{errorMessage}</Text> : null}
    </View>
  );
};

export default LoginScreen;
