import { Dimensions, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import Search from '../assets/svgs/Search';
const {height, width} = Dimensions.get('screen');

const SeachBar = ({setSearch}) => {
  return (
    <View>
          <TextInput
            onChangeText={e => setSearch(e)}
            placeholder="Search here"
            style={styles.SearchBar}></TextInput>
            <View
            style={{position: 'absolute', top: height / 23, left: width / 12}}>
            <Search color="black" />
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
    backgroundColor: 'white',
    marginBottom: '2%',
    paddingLeft: '13%',
    height: height / 14,
    shadowColor: '#000',
    backgroundColor: 'white',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 5,
  }
})