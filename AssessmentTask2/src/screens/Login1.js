import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ImageBackground,
} from 'react-native';

import Logo from '../Assets/Images/Logo.svg';
import InputBox from '../components/InputBox';
import Button from '../components/Button';
import ErrorMessage from '../components/ErrorMessage';

const Login1 = () => {
  const [phoneNumber, setPhoneNumber] = useState();
  const [phoneNumberError, setPhoneNumberError] = useState();

  const navigation = useNavigation();
  const phoneno = /^\d{10}$/;

  const CheckNumber = () => {
    if (phoneno.test(phoneNumber)) {
      sendOpt();
    } else {
      setPhoneNumberError('Not a correct phone number ');
    }
  };

  const sendOpt = () => {
    const mob = '+91' + phoneNumber;
    auth()
      .signInWithPhoneNumber(mob)
      .then(res => {
        navigation.navigate('VerifyOtp', {number: phoneNumber, Otp: res});
      });
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'flex-start',
      }}>
      <KeyboardAvoidingView style={{flex:1}} >
      <ImageBackground
        source={require('../Assets/Images/Pattern.jpg')}
        style={{
          width: '100%',
          height: '100%',
          flex: 0.5,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        resizeMode="cover">
        <Logo />
      </ImageBackground>
      <View style={{flex: 0.3, padding: 30,justifyContent:"center"}}>
        <Text style={Styles.title}>Welcome to the app</Text>
        <InputBox
          length={10}
          type={'numeric'}
          placeholder={'Mobile Number'}
          item={[phoneNumber, setPhoneNumber]}
          errors={[phoneNumberError, setPhoneNumberError]}/>
        <ErrorMessage message={phoneNumberError} />
      </View>
      </KeyboardAvoidingView>
      <View style={{flex: 0.3,justifyContent:"center"}}>
        <Button functionality={() => CheckNumber()} title={'Verify '} />
      </View>
    </View>
  );
};
export default Login1;

const Styles = StyleSheet.create({
  title: {
    color: '#FEAD1D',
    fontFamily: 'Viga-Regular',
    fontSize: 22,
    textAlign: 'center',
    paddingVertical:20
  },
  bottom: {
    backgroundColor: '#FFFFFF',
    padding: 30,
    flex: 0.4,
    borderWidth: 1,
    justifyContent: 'flex-end',
  },
  outerView: {
    backgroundColor: '#FFFFFF',
    alignContent: 'center',
    flex: 0.5,
    borderWidth: 1,
  },
  logoView: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 50,
    alignItems: 'center',
  },
  svg: {position: 'absolute', zIndex: 1},
});
