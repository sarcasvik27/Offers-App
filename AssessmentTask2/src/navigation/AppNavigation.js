import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SingleProduct from '../screens/SingleProduct';
import MyDrawer from './DrawerNavigation';
const Stack = createNativeStackNavigator();
const AppNavigation = () => {
  return (
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="MyDrawer" component={MyDrawer} />
        <Stack.Screen name="SingleProduct" component={SingleProduct} />
      </Stack.Navigator>
  );
};

export default AppNavigation