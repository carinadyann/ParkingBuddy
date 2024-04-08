import * as React from 'react';
import MainContainer from './navigation/MainContainer';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import StackNavigator from './navigation/StackNav'; // might need to change
import TopTabNavigator from './navigation/TopBarNav'; // might need to change

function App() {
  return(
    <SafeAreaProvider>
      <TopTabNavigator />
      <MainContainer />
    </SafeAreaProvider>
  );
}

export default App;