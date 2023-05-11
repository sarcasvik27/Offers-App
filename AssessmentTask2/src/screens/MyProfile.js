import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  Image,
  View,
  Pressable,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet
} from 'react-native';
import {GlobalContext} from '../context/Index';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {DrawerActions, useNavigation} from '@react-navigation/native';
import SmallButton from '../components/SmallButton';
import Group from '../Assets/Images/Group.svg';

const MyProfile = () => {
  const [edit, setEdit] = useState(false);
  const [image, setImage] = useState();
  const [data,setData]=useState(null)
  const [fname, setFname] = useState();
  const [lname, setLname] = useState();
  const [token, setToken] = useState();
  const [loading,setLoading]=useState(true);
  const [id, setId] = useState();
  const {state, actions} = useContext(GlobalContext);

 const {navigationState}=state
  useEffect(() => {
    getId();
  }, []);

  const navigation = useNavigation();
  const arr=[]

  const userDetails = {
    fname: fname,
    lname: lname,
    image: image,
    id: id,
  };
  const getId = async () => {
    await AsyncStorage.getItem('Phonenumber').then(response => {
      setId(response);
      firestore()
        .collection('Users')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(documentSnapshot => {
            if (response == documentSnapshot.data().userDetails.id) {
              setToken(documentSnapshot.id);
              setFname(documentSnapshot.data().userDetails.fname);
              setLname(documentSnapshot.data().userDetails.lname);
              setImage(documentSnapshot.data().userDetails.image);
              setLoading(false)
            }
          });
        });
    });
  };

  const editPic = () => {
    if (edit === true) {
      ImagePicker.openPicker({
        cropping: true,
      }).then(image => {
        saveImage(image.path);
      });
    }
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

  const submit = async () => {
    await firestore()
      .collection('Users')
      .doc(token)
      .update({userDetails})
    setEdit(false);

  };

  const Logout = () => {
    AsyncStorage.removeItem('Phonenumber')
    actions.NavigationDecider(! navigationState);
    actions.AllOffersAction([])
    actions.SaveOffersAction([])
  };

  return (
    <KeyboardAvoidingView style={Styles.keyboard}>
      <ScrollView >
        <View
          style={Styles.outerView}>
          <View style={Styles.top}>
            <Pressable
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
              <Image
                source={require('../Assets/Images/bars.png')}
                style={Styles.bars}
              />
            </Pressable>
            <Text
              style={Styles.title}>
              User Details
            </Text>
          </View>
          <View style={Styles.svgView}>
            <Group
              style={Styles.svg}
            />
          </View>
          <View style={Styles.details}>
             {data!==null || !loading?  
             <>    
            {image === null ? (
              <Pressable
                onPress={() => {
                  editPic();
                }}>
                <Image
                  source={require('../Assets/Images/User.jpg')}
                  style={Styles.image}></Image>
              </Pressable>
            ) : (
              <Pressable
                onPress={() => {
                  editPic();
                }}>
                <Image
                  source={{uri: image}}
                  style={Styles.image}></Image>
              </Pressable>
            )}
            <Pressable
              onPress={() => {
                setEdit(!edit);
              }}
              style={Styles.imageView}>
              <Text style={Styles.editText}>Edit Details</Text>
            </Pressable>
            <View style={Styles.inputView}>
              <TextInput
                style={Styles.textinput}
                placeholder={'First Name'}
                value={fname}
                onChangeText={data => {
                  setFname(data);
                }}
                editable={edit}></TextInput>
              <TextInput
                style={Styles.textinput}
                placeholder={'Last Name'}
                value={lname}
                onChangeText={data => {
                  setLname(data);
                }}
                editable={edit}></TextInput>
            </View>
            <View
              style={Styles.buttonView}>
              <SmallButton
                title={'Submit'}
                functionality={() => {
                  submit();
                }}
                disable={!edit}
              />
              <SmallButton
                title={'Logout'}
                functionality={() => {
                  Logout();
                }}
              />
            </View></>:<ActivityIndicator/>}
  </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
export default MyProfile;


const Styles=StyleSheet.create({
  buttonView:{flexDirection: 'row', justifyContent: 'space-between'},
  textinput:{
    borderWidth: 1,
    borderRadius: 16,
    width: 200,
    marginVertical: 10,
  },
  keyboard:{flex: 1, backgroundColor: '#FFFFFF'},
  outerView:{
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  inputView:{margin: 20},
  top:{padding: 20, position: 'absolute', zIndex: 1},
  bars:{height: 30, width: 30},
  title:{
    fontFamily: 'Viga-Regular',
    fontWeight: 400,
    fontSize: 31,
    color: '#09051C',
    width: 200,
    paddingTop: 40,
  },
  svgView:{alignItems: 'flex-end'},
  svg:{
    opacity: 0.6,
  },
  details:{justifyContent: 'center', alignItems: 'center'},
  image:{height: 200, width: 200, borderRadius: 100},
  imageView:{
    backgroundColor: '#FEAD1D',
    padding: 10,
    borderRadius: 16,
    marginVertical: 10,
  },
  editText:{color: 'white'}
})