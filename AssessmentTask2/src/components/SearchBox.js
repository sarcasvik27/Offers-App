import React from 'react';
import {TextInput, StyleSheet, View} from 'react-native';
import Search from '../Assets/Images/Search.svg';
const SearchBox = ({search,empty}) => {
  //  const [searchItem, setSearchItem] = searchValue;
   const [searchInput, setSearchInput] = search;
  return (
    <View style={Styles.view}>
      <Search />
      <TextInput
      placeholder='Search any offer'
        style={Styles.input}
        value={searchInput}
        onChangeText={setSearchInput}
        // onChange={setSearchItem}
      />
    </View>
  );
};
export default SearchBox;

const Styles = StyleSheet.create({
  view: {
    backgroundColor: '#f4eee0',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    margin:10,
  },
  input: {paddingHorizontal: 20},
});
