import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainContainer from './navigation/MainContainer'; // Ensure this path is correct

function App() {
  return (
    <SafeAreaProvider>
      <MainContainer />
    </SafeAreaProvider>
  );
}

export default App;
