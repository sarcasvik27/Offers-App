import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  Image,
  View,
  Pressable,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Group from '../Assets/Images/Group.svg';
import {GlobalContext} from '../context/Index';
import CardDisplay from '../components/CardDisplay';
import {DrawerActions, useNavigation} from '@react-navigation/native';

const Home = () => {
  const {state, actions} = useContext(GlobalContext);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(10);
  const [skip, setSkip] = useState(0);
  const {AllOffers} = state;

  const navigation = useNavigation();
  let arr = [];
  useEffect(() => {
    getApiData();
  }, [page]);

  useEffect(() => {
    getLikedItems();
  }, [data]);

  const getApiData = () => {
    // to get the data from api and changing the isLiked = false
    fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`)
      .then(res => res.json())
      .then(item => {
        const arr = item.products.map(data => {
          data.isLiked = false;
          return data;
        });
        actions.AllOffersAction([...AllOffers, ...arr]);
        setData(arr);
      });
  };

  const getLikedItems = async () => {
    // checking from the firebase if the user has already liked some products and changing their isLiked =true
    await AsyncStorage.getItem('Phonenumber').then(response => {
      firestore()
        .collection('Users')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(documentSnapshot => {
            if (response === documentSnapshot.data().userDetails.id) {
              if (documentSnapshot.data().favorites !== undefined) {
                const arr3 = AllOffers.map(data => {
                  documentSnapshot.data().favorites.map(item => {
                    if (data.id === item) {
                      data.isLiked = true;
                      arr.push(data);
                    }
                  });
                  actions.SaveOffersAction(arr);
                  return data;
                });
                actions.AllOffersAction(arr3).then(() => {
                  setLoading(false);
                });
              } else {
                setLoading(false);
              }
            }
          });
        });
    });
  };

  return (
    <View style={Styles.outerView}>
      {loading ? (
        <View style={Styles.topView}>
          <ActivityIndicator style={Styles.activity} />
        </View>
      ) : (
        <>
          <View style={Styles.barView}>
            <Pressable
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
              <Image
                source={require('../Assets/Images/bars.png')}
                style={Styles.bars}
              />
            </Pressable>
            <Text style={Styles.title}>Find Your Favorite deals</Text>
          </View>
          <View style={Styles.svgView}>
            <Group style={Styles.svg} />
          </View>
          <View style={Styles.bottom}></View>
          <CardDisplay
            page={[page, setPage]}
            limit={[limit, setLimit]}
            skip={[skip, setSkip]}
          />
        </>
      )}
    </View>
  );
};
export default Home;

const Styles = StyleSheet.create({
  bottom: {padding: 15},
  svg: {
    opacity: 0.6,
  },
  svgView: {alignItems: 'flex-end'},
  title: {
    fontFamily: 'Viga-Regular',
    fontWeight: 400,
    fontSize: 31,
    color: '#09051C',
    width: 200,
    paddingTop: 40,
  },
  outerView: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    borderWidth: 1,
  },
  topView: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  activity: {size: 30},
  barView: {padding: 20, position: 'absolute', zIndex: 1},
  bars: {height: 30, width: 30},
});
