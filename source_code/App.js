import * as React from 'react';
import MainContainer from './navigation/MainContainer';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import StackNav from './navigation/StackNav';
import TopBarNavigator from './navigation/TopBarNav';

function App() {
  return(
    <SafeAreaProvider>
      <MainContainer />
      <StackNavigator />
    </SafeAreaProvider>
  );
}

export default App;