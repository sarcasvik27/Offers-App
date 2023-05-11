import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {View, Text, Image, FlatList, Pressable, StyleSheet} from 'react-native';

const SingleProduct = ({route}) => {
  const navigation = useNavigation();
  return (
    <View style={Styles.outerView}>
      <View style={Styles.bars}>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon name="chevron-left" style={Styles.icon} />
        </Pressable>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          data={route.params.images}
          renderItem={element => {
            return (
              <Image source={{uri: element.item}} style={Styles.image}></Image>);
          }}></FlatList>
          </View>
           <Text style={Styles.title}>{route.params.title}</Text>
           <Text style={Styles.desc}>{route.params.description}</Text>
            <View  style={Styles.bottom}>
             <Text style={Styles.percent}>₹{route.params.discountPercentage}%</Text>
          </View>
           <Text style={Styles.finalPrice}>{' '}Final price = ₹{route.params.price}</Text>
     </View>
  );
};
export default SingleProduct;
const Styles = StyleSheet.create({
  bars:{flex: 0.9, marginBottom: 20},
  desc:{fontSize: 16, paddingVertical: 20},
  outerView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 10,
  },
  icon: {fontSize: 20, padding: 10},
  image: {
    width: 200,
    height: '100%',
    borderRadius: 16,
    margin: 5,
  },
  title:{
    fontFamily: 'Viga-Regular',
    color: 'black',
    fontWeight: '600',
    fontSize: 30,
  },
  bottom:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  percent:{
    fontSize: 14,
    color: 'red',
    fontFamily: 'Viga-Regular',
    fontSize: 22,
  },
  finalPrice:{
    fontSize: 14,
    color: '#FEAD1D',
    fontFamily: 'Viga-Regular',
    fontSize: 22,
    textAlign: 'center',
  }
});
