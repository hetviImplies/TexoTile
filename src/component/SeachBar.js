import { Dimensions, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { Search } from '../assets/svgs/svg';
import { hp, wp } from '../Global_Com/responsiveScreen';
import { White, Yellow } from '../Global_Com/color';

const {height, width} = Dimensions.get('screen');

const SeachBar = ({setSearch}) => {
  return (
    <View>
          <TextInput
          selectionColor={Yellow}
            onChangeText={e => setSearch(e)}
            placeholder="Search here"
            style={styles.SearchBar}></TextInput>
            <View
            style={{position: 'absolute', top: hp(4), left: wp(8)}}>
            <Search/>
          </View>
        </View>
  )
}

export default SeachBar

const styles = StyleSheet.create({
    SearchBar: {
    borderRadius: 10,
    marginHorizontal: '4%',
    marginTop: '4%',
    backgroundColor: White,
    marginBottom: '2%',
    paddingLeft: '13%',
    height: hp(7),
    shadowColor: '#000',
    backgroundColor: White,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 5,
  }
})