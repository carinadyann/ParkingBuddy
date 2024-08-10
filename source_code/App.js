import * as React from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MainContainer from './navigation/MainContainer';
import LoginScreen from './navigation/screens/LoginScreen';
import SettingsScreen from './navigation/screens/SettingsScreen.js';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
//import StackNav from './navigation/StackNav';

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        {isLoggedIn ? (
          <View style={styles.container}>
            <MainContainer onLogout={handleLogout} />
            {/* <Button title="Logout" onPress={handleLogout}/> */}
          </View>
        ) : (
          <LoginScreen onLoginSuccess={handleLoginSuccess} /> // Ensure onLoginSuccess is passed here
        )}
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
