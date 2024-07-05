import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MainContainer from './navigation/MainContainer';
import LoginScreen from './navigation/screens/LoginScreen';
//import { styles } from '../style';

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
    await AsyncStorage.setItem('userToken', 'abc123'); // Replace with actual authentication logic
    setIsLoggedIn(true);
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken');
    setIsLoggedIn(false);
  };

  return (
    <SafeAreaProvider>
      {isLoggedIn ? (
        <View style={styles.container}>
          <MainContainer />
          <Button title="Logout" onPress={handleLogout} />
        </View>
      ) : (
        <LoginScreen onLoginSuccess={handleLoginSuccess} />
      )}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
