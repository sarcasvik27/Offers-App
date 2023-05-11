import React, {useState, useEffect, useContext} from 'react';
import {
  FlatList,
  Text,
  Pressable,
  View,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import {GlobalContext} from '../context/Index';

const SavedOffer = () => {
  const {state, actions} = useContext(GlobalContext);
  const {AllOffers, SavedOffers} = state;
  const [token, setId] = useState([]);
  const [loading, setLoading] = useState(false);
  const arr2 = [];
  const arr3 = [];
  useEffect(() => {
    getId();
  }, []);

  const deleteLike = id => {
    SavedOffers.map(data => {
      if (data.id !== id) {
        arr2.push(data);
        arr3.push(data.id);
      }
    });

    actions.SaveOffersAction(arr2);
    firestore().collection('Users').doc(token).update({favorites: arr3});
  };
  const arr = [];
  const deleteoffer = id => {
    AllOffers.map(data => {
      if (data.id === id) {
        data.isLiked = false;
      }
      arr.push(data);
    });
    actions.AllOffersAction([...arr]);
    deleteLike(id);
  };

  const getId = async () => {
    await AsyncStorage.getItem('Phonenumber').then(response => {
      firestore()
        .collection('Users')
        .get()
        .then(data => {
          data.forEach(documentSnapshot => {
            if (response == documentSnapshot.data().userDetails.id) {
              setId(documentSnapshot.id)
            }
          });
        });
    });
  };

  return (
    <View style={Styles.fullScreen}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <View style={{flex:1}}>
          {SavedOffers.length !== 0 ? (
            <FlatList
              data={SavedOffers}
              renderItem={element => {
                {
                  return (
                    <View style={Styles.outerView}>
                      <Image
                        source={{uri: element.item.images[0]}}
                        style={Styles.image}
                      />
                      <View style={Styles.textView}>
                        <Text style={Styles.title}>{element.item.title}</Text>
                        <Text numberOfLines={2}>
                          {element.item.description}
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <Text style={Styles.price}>
                            ₹{element.item.price}
                          </Text>
                          <Pressable
                            onPress={() => deleteoffer(element.item.id)}>
                            <Icon
                              name="trash-o"
                              style={Styles.trash}></Icon>
                          </Pressable>
                        </View>
                      </View>
                    </View>
                  );
                }
              }}></FlatList>
          ) : (
            <View
              style={Styles.bottomView}>
              <Text>No Items found &#128532;</Text>
           </View>  
          )}
        </View>
      )}
    </View>
  );
};
export default SavedOffer;

const Styles = StyleSheet.create({
  bottomView:{flex:1, justifyContent: 'center', alignItems: 'center'},
  trash:{
    fontSize: 25,
  },
  outerView: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    margin: 10,
    borderRadius: 16,
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
  },
  fullScreen: {
    flex: 1,
    backgroundColor: 'rgba(90, 108, 234,0.1)',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 16,
  },
  textView: {
    width: '50%',
  },
  price: {
    color: '#FEAD1D',
    fontFamily: 'Viga-Regular',
    paddingVertical: 10,
  },
});
