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
        <BoxContainer style={styles.boxDark}>
            <TextInput
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
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
