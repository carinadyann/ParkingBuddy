import React, { useState } from 'react';
import { ScrollView, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { styles } from '../style';
import BoxContainer from '../BoxContainer';

const LoginScreen = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Replace with actual authentication logic
    if (username === 'admin' && password === 'password') {
      onLoginSuccess(); // Call this function to indicate successful login
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <ScrollView style={styles.container}>
        <Image source={require('../../assets/images/logoName.png')} style={styles.logoCenter} />
        <BoxContainer style={styles.boxDark}>
            <TextInput
                placeholder="Username"
                placeholderTextColor="white"
                value={username}
                onChangeText={setUsername}
                style={styles.input}
            />
            <TextInput
                placeholder="Password"
                placeholderTextColor="white"
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                secureTextEntry
            />
            <TouchableOpacity title="Submit" onPress={handleLogin} style={styles.button}>
                <Text style={styles.text}>Login</Text>
            </TouchableOpacity>
        </BoxContainer>
    </ScrollView>
  );
};

export default LoginScreen;
