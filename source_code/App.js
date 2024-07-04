import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Button, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MainContainer from './navigation/MainContainer';
import LocatorScreen from './navigation/screens/LocatorScreen';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        setIsLoggedIn(true);
      }
    };

    checkLoginStatus();
  }, []);

  const handleLoginSuccess = async () => {
    await AsyncStorage.setItem('userToken', 'abc123');
    setIsLoggedIn(true);
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken');
    setIsLoggedIn(false);
  };

  return (
    <SafeAreaProvider>
      {isLoggedIn ? (
        <ScrollView>
          <MainContainer onLogout={handleLogout} />
          <Button title="Logout" onPress={handleLogout} />
        </ScrollView>
      ) : (
        <LocatorScreen onLoginSuccess={handleLoginSuccess} />
      )}
    </SafeAreaProvider>
  );
}

export default App;
