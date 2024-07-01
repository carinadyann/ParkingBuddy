import * as React from 'react';
import { View, ScrollView, Text, TextInput, Button, StyleSheet, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ visible, onLoginSuccess }) => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleLogin = () => {
        if (username === 'admin' && password === 'password') {
            onLoginSuccess();
        } else {
            alert('Invalid credentials');
        };
    }

    return (
        <ScrollView>
            <Text>Login</Text>
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
            <Button title="Login" onPress={handleLogin} />
        </ScrollView>
    );
};
