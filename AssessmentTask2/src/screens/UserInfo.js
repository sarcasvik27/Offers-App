import React, {useState, useContext} from 'react';
import {
  Text,
  Pressable,
  View,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {GlobalContext} from '../context/Index';
import ImagePicker from 'react-native-image-crop-picker';
import firestore from '@react-native-firebase/firestore';

import Group from '../Assets/Images/Group.svg';
import InputBox from '../components/InputBox';
import ErrorMessage from '../components/ErrorMessage';
import Button from '../components/Button';
import storage from '@react-native-firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
const UserInfo = ({route}) => {
  const [firstName, setFirstName] = useState('');
  const {state, actions} = useContext(GlobalContext);
  const [lastName, setLastName] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [image, setImage] = useState(null);

  const {navigationState} = state;

  let regname = /^[A-Za-z ,.'-]+$/;

  const userDetails = {
    fname: firstName,
    lname: lastName,
    image: image,
    id: route.params.number,
  };

  const saveImage = async photo => {
    const uploadUri = photo;
    let fileName = `UserImage/${uploadUri.substring(
      uploadUri.lastIndexOf('/') + 1,
    )}`;
    await storage().ref(fileName).putFile(uploadUri);

    const url = await storage().ref(fileName).getDownloadURL();
    setImage(url);
  };
  const submit = () => {
    AsyncStorage.setItem('Phonenumber', route.params.number);
    firestore()
      .collection('Users')
      .add({userDetails})
      .then(() => {
        actions.NavigationDecider(!navigationState);
      });
  };

  const validate = () => {
    let isfnameValid = fnameValidation();
    let islnameValid = lnameValidation();

    if (isfnameValid && islnameValid) {
      submit();
    }
  };
  const fnameValidation = () => {
    if (firstName.trim() == '') {
      setFirstNameError("Name can't be empty");
      return false;
    } else if (regname.test(firstName.trim())) {
      return true;
    } else {
      setFirstNameError('Invalid name');
      return false;
    }
  };
  const lnameValidation = () => {
    if (lastName.trim() == '') {
      setLastNameError("Last name can't be empty");
      return false;
    } else if (regname.test(lastName.trim()) == true) {
      return true;
    } else {
      setLastNameError('Inavlid Last name');
      return false;
    }
  };

  return (
    <KeyboardAvoidingView style={Style.keyboard}>
      <ScrollView>
        <View style={Style.outerView}>
          <View style={Style.container}>
            <Text style={Style.text}>Customer Details...</Text>
          </View>
          <View style={Style.imageView}>
            <Group style={Style.image} />
          </View>
          {image === null ? (
            <Pressable
              style={Style.userImageView}
              onPress={() => {
                ImagePicker.openPicker({
                  cropping: true,
                }).then(image => {
                  console.log('hi ', image);
                  saveImage(image.path);
                });
              }}>
              <Image
                source={require('../Assets/Images/User.jpg')}
                style={Style.user}></Image>
            </Pressable>
          ) : (
            <Pressable
              style={Style.userImageView}
              onPress={() => {
                ImagePicker.openPicker({
                  cropping: true,
                }).then(image => {
                  saveImage(image.path);
                });
              }}>
              <Image source={{uri: image}} style={Style.user}></Image>
            </Pressable>
          )}

          <View style={Style.inputView}>
            <InputBox
              placeholder={'First Name'}
              item={[firstName, setFirstName]}
              errors={[firstNameError, setFirstNameError]}
            />
            <ErrorMessage message={firstNameError} />
            <InputBox
              placeholder={'Last Name'}
              item={[lastName, setLastName]}
              errors={[lastNameError, setLastNameError]}
            />
            <ErrorMessage message={lastNameError} />
            <Button title={'Submit'} functionality={validate} />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
export default UserInfo;

const Style = StyleSheet.create({
  container: {position: 'absolute'},
  keyboard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  outerView: {backgroundColor: '#FFFFFF', flex: 1},

  imageView: {
    alignItems: 'flex-end',
  },

  image: {
    opacity: 0.6,
  },
  text: {
    fontFamily: 'Viga-Regular',
    fontWeight: '600',
    fontSize: 31,
    color: '#09051C',
    width: 200,
    paddingTop: 100,
    paddingLeft: 20,
  },
  inputView: {
    alignSelf: 'center',
    paddingVertical: 20,
  },
  user: {
    borderRadius: 100,
    height: 150,
    width: 150,
  },
  userImageView: {
    backgroundColor: 'white',
    alignItems: 'center',
  },
});
