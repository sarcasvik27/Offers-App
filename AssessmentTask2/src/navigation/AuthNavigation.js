import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import VerifyOtp from '../screens/VerifyOtp';
import Login1 from '../screens/Login1';
import UserInfo from '../screens/UserInfo';
const Stack = createNativeStackNavigator();
const AuthNavigation = () => {
  return (
      <Stack.Navigator  screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Login" component={Login1} />
        <Stack.Screen name="VerifyOtp" component={VerifyOtp} />
        <Stack.Screen name="UserInfo" component={UserInfo}/>
      </Stack.Navigator>
  );
};

export default AuthNavigation