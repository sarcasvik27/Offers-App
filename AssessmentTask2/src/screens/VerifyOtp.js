import React, {useState, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TextInput, Text, StyleSheet, View} from 'react-native';
import {GlobalContext} from '../context/Index';
import {useNavigation} from '@react-navigation/native';
import Group from '../Assets/Images/Group.svg';
import Button from '../components/Button';
const VerifyOtp = ({route}) => {
  const [pin, setPin] = useState('');
  const {state, actions} = useContext(GlobalContext);
  const {navigationState} = state;
  const navigation = useNavigation();
  const checkOtp = async () => {
    await route.params.Otp.confirm(pin).then(data => {
      if (data.additionalUserInfo.isNewUser == false) {
        AsyncStorage.setItem('Phonenumber', route.params.number);
        actions.NavigationDecider(!navigationState);
      } else {
        navigation.navigate('UserInfo', {number: route.params.number});
      }
    });
  };

  return (
    
    <View style={Style.outerView}>
    <View style={Style.innerView}>
      <View style={Style.textBox}>
        <Text style={Style.text}>Verify Otp</Text>
      </View>
    <View style={Style.svgg}>
        <Group
          style={Style.group}
        />
      </View>
      </View>
      <View style={Style.view}>
        <TextInput
          elevation={20}
          placeholder="Enter OTP"
          keyboardType="numeric"
          maxLength={6}
          style={Style.inputBox}
          value={pin}
          onChangeText={pin => {
            setPin(pin);
          }}></TextInput>
        <Button title={'Verify'} functionality={() => checkOtp()} />
      </View>
      </View> 
  );
};
export default VerifyOtp;

const Style = StyleSheet.create({
  group:{
    opacity: 0.6,
  },
  svgg:{alignItems: 'flex-end'},
  text:{
    fontFamily: 'Viga-Regular',
    fontWeight: 400,
    fontSize: 31,
    color: '#09051C',
    width: 200,
    paddingTop: 40,
  },
  textBox:{padding: 20, position: 'absolute', zIndex: 1},
  innerView:{flex:0.5},
  outerView:{flex:1},
  inputBox: {
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    shadowColor: "rgb(90, 108, 234)",
  },
  view: {
    flex:1,
    justifyContent: "space-evenly",
    padding: 30,
  },
});
