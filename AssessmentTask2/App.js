import 'react-native-gesture-handler'
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigation from './src/navigation/RootNavigation';
import {GlobalProvider} from './src/context/Index';
import VerifyOtp from './src/screens/VerifyOtp';
const App = () => {
  return (
    <GlobalProvider>
      <NavigationContainer>
        <RootNavigation/>
      </NavigationContainer>
    </GlobalProvider>
  );
};

export default App;
