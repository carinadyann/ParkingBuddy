import React, { useState } from 'react';
import { ScrollView, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image, View } from 'react-native';
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
    <ScrollView contentContainerStyle={styles.loginContainer}>
        {/* Logo Here */}
        <Image source={require('../../assets/logoName.png')} style={styles.logoCenterLarge} />
        <BoxContainer style={styles.boxDark}>
            <Text style={styles.break}>{'\n'}</Text>
            <TextInput
                placeholder="Username"
                placeholderTextColor="#CBEEF7"
                value={username}
                onChangeText={setUsername}
                style={[styles.input, { color: 'white' }]}
            />
            <Text style={styles.break}>{'\n'}</Text>
            <TextInput
                placeholder="Password"
                placeholderTextColor="#CBEEF7"
                value={password}
                onChangeText={setPassword}
                style={[styles.input, { color: 'white' }]}
                secureTextEntry
            />
            <Text style={styles.break}>{'\n'}</Text>
            <TouchableOpacity title="Submit" onPress={handleLogin} style={styles.button}>
                <Text style={styles.text}>Login</Text>
            </TouchableOpacity>
        </BoxContainer>
    </ScrollView>
  );
};

export default LoginScreen;
