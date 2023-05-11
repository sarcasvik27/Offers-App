import React, {useEffect, useState,useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from '../screens/SplashScreen';
import AppNavigation from './AppNavigation';
import AuthNavigation from './AuthNavigation';
import {GlobalContext} from '../context/Index';

const RootNavigation = () => {
  const {state, actions} = useContext(GlobalContext);
  const [id, setid] = useState(null);
  const [loader, setLoader] = useState(true);
  const {navigationState} = state;
  useEffect(() => {
    getId() 
  }, [navigationState]);

  const getId = async () => {
    const ID = await AsyncStorage.getItem('Phonenumber');
    setid(ID);
    setLoader(false);
  };
  
  const checknavigation = () => {
    if (id == null) {
      return <AuthNavigation></AuthNavigation>;
    } else {
      return <AppNavigation></AppNavigation>;
    }
  };
  return <>{loader === true ? <SplashScreen /> : checknavigation()}</>;
};

export default RootNavigation;
