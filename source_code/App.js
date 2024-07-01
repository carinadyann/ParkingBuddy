import * as React from 'react';
import MainContainer from './navigation/MainContainer';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import StackNavigator from './navigation/StackNav'; // might need to change
import TopTabNavigator from './navigation/TopBarNav'; // might need to change
import { View, Text, Button, StyleSheet } from 'react-native';
import { AsyncStorage } from 'react-native';
import LoginScreen from './navigation/screens/LoginScreen';

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

  const handleLoginSuccess = async() => {
    await AsyncStorage.setItem('userToken', 'abc123');
    setIsLoggedIn(true);
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken');
    setIsLoggedIn(false);
  };

  return(
    <SafeAreaProvider>
    {isLoggedIn ? (
      <View>
        <MainContainer />
        <Button title="Logout" onPress={handleLogout}/>
      </View>
    ) : (
      <LoginScreen onLoginSuccess={handleLoginSuccess} />
    )}
    </SafeAreaProvider>
  );
}

export default App;
