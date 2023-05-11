import React, {useState, useEffect, useContext, useMemo} from 'react';
import {
  FlatList,
  Text,
  Pressable,
  View,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {GlobalContext} from '../context/Index';
import SearchBox from './SearchBox';

const CardDisplay = ({page, skip, limit}) => {
  const [token, setId] = useState();
  const [searchInput, setSearchInput] = useState(null);
  const [loading, setLoading] = useState(true);

  const {state, actions} = useContext(GlobalContext);
  const {AllOffers, SavedOffers} = state;

  const [Page, setPage] = page;
  const [Skip, setSkip] = skip;
  const [Limit, setLimit] = limit;

  const navigation = useNavigation();
  const arr2 = [];
  const arr3 = [];
  const arr5 = [];

  const {MyProducts} = useMemo(() => {
    const {AllOffers} = state;
    if (AllOffers.length > 0) {
      setLoading(false);
    }
    return {AllOffers};
  }, [AllOffers, SavedOffers]);

  useEffect(() => {
    getId();
  }, []);

  useEffect(() => {
    searching()
  }, [searchInput]);

  const searching =()=>{
    if (searchInput !== null) {
      fetch(`https://dummyjson.com/products/search?q=${searchInput}`)
        .then(res => res.json())
        .then(data => {
          if (SavedOffers.length > 0) {
            data = data.products.map(item => {
              SavedOffers?.find(offers => {
                if (offers.id === item.id) {
                  return (item.isLiked = true);
                } else {
                  return (item.isLiked = false);
                }
              });
              return item;
            });
          } else {
            data = data.products.map(item => {
              return Object.assign(item, {isLiked: false});
            });
          }
          actions.AllOffersAction(data);
        });
    }
  }

  const getId = async () => {
    await AsyncStorage.getItem('Phonenumber').then(response => {
      firestore()
        .collection('Users')
        .get()
        .then(data => {
          data.forEach(documentSnapshot => {
            if (response == documentSnapshot.data().userDetails.id) {
              setId(documentSnapshot.id);
            }
          });
        });
    });
  };

  const LikedCards = id => {
    const arr = AllOffers.map(data => {
      if (data.id === id) {
        if (data.isLiked === false) {
          data.isLiked = true; // adding isLiked True to the liked card
          actions.SaveOffersAction([...SavedOffers, data]).then(() => {
            // storing the liked card data in context
            [...SavedOffers, data].map(data => {
              arr2.push(data.id);
            }); // storing the data of the currently liked products into a local array
            firestore()
              .collection('Users')
              .doc(token)
              .update({favorites: arr2}); //updating the values on firebase
          });
        } else {
          data.isLiked = false; //unliking by clicking on red heart
          SavedOffers.map((data, index) => {
            if (data.id != id) {
              arr3.push(data); // storing all the liked products in a local array
              arr5.push(data.id); //storing the id of all the liked products for firebase
            }
          });
          actions.SaveOffersAction(arr3); // storing the liked card data in context
          firestore().collection('Users').doc(token).update({favorites: arr5}); //updating the values on firebase
        }
      }
      return data;
    });
    actions.AllOffersAction(arr); // changing the AllOffers context so that red heart can appear
  };
  return (
    <View style={Styles.outerScreen}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <>
          <SearchBox search={[searchInput, setSearchInput]} />
          {AllOffers.length > 0 ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              onEndReachedThreshold={0.5}
              onEndReached={() => {
                if (AllOffers?.length === Page * Limit) {
                  setPage(Page + 1);
                  setSkip(Skip + 10);
                }
              }}
              style={Styles.flatList}
              data={AllOffers}
              renderItem={element => {
                return (
                  <Pressable
                    onPress={() => {
                      navigation.navigate('SingleProduct', element.item);
                    }}>
                    <View style={Styles.outerView}>
                      <View style={Styles.outerContainer}>
                        <Image
                          style={Styles.image}
                          source={{uri: element.item.images[0]}}
                        />
                        <View style={Styles.card}>
                          <View style={Styles.textView}>
                            <Text style={Styles.titleText}>
                              {element.item.title}
                            </Text>
                            <Text numberOfLines={2} style={Styles.desc}>
                              {element.item.description}
                            </Text>
                            <Text style={Styles.discountText}>
                              {element.item.discountPercentage}% off
                            </Text>
                          </View>
                        </View>
                      </View>

                      <View style={Styles.priceContainer}>
                        <Text style={Styles.priceText}>
                          {' '}
                          ₹{element.item.price}
                        </Text>

                        {element.item.isLiked == false ? (
                          <Pressable
                            onPress={() => LikedCards(element.item.id)}>
                            <Icon name="heart" style={Styles.icon}></Icon>
                          </Pressable>
                        ) : (
                          <Pressable
                            onPress={() => LikedCards(element.item.id)}>
                            <Icon name="heart" style={Styles.redIcon}></Icon>
                          </Pressable>
                        )}
                      </View>
                    </View>
                  </Pressable>
                );
              }}
              keyExtractor={item => item.id}></FlatList>
          ) : (
            <>
              <View
                style={Styles.noProductFoundView}>
                <Text
                  style={Styles.noProductFoundText}>
                  No such Products found 
                </Text>
              </View>
            </>
          )}
        </>
      )}
    </View>
  );
};
export default CardDisplay;

const Styles = StyleSheet.create({
  noProductFoundText:{
    color: '#FEAD1D',
    fontFamily: 'Viga-Regular',
    fontSize: 22,
  },
  noProductFoundView:{
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    flex: 1,
  },
  outerScreen:{flex: 1},
  redIcon: {
    fontSize: 25,
    paddingVertical: 10,
    color: 'red',
  },
  icon: {fontSize: 25, paddingVertical: 10},
  priceText: {
    color: '#FEAD1D',
    fontFamily: 'Viga-Regular',
    fontSize: 22,
  },
  priceContainer: {
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  desc: {fontSize: 14},
  discountText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
    paddingVertical: 15,
  },
  outerContainer: {
    padding: 10,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-around',
  },
  textView: {},
  flatList: {
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    backgroundColor: 'rgba(90, 108, 234,0.1)',
  },
  outerView: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    margin: 10,
    borderRadius: 13,
  },
  image: {height: 80, width: 80, borderRadius: 16},

  card: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    width: '50%',
    paddingHorizontal: 10,
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
});
