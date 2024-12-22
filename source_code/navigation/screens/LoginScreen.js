import React, { useState } from 'react';
import { ScrollView, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image, View } from 'react-native';
import { styles } from '../style';
import BoxContainer from '../BoxContainer';
import { auth } from '../../firebase';
import { firebaseConfig } from "../../firebase";
import { signInWithEmailAndPassword } from 'firebase/auth';

const LoginScreen = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onLoginSuccess();
    } catch (error) {
      Alert.alert('Login Failed', error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.loginContainer}>
        {/* Logo Here */}
        <Image source={require('../../assets/logoName.png')} style={styles.logoCenterLarge} />
        <BoxContainer style={styles.boxDark}>
            <Text style={styles.break}>{'\n'}</Text>
            <TextInput
                placeholder="Email"
                placeholderTextColor="#CBEEF7"
                value={email}
                onChangeText={setEmail}
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
