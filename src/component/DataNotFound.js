import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import DataNot from '../assets/svgs/DataNot'
import { styleText } from '../assets/fonts/Fonts'
const {height,width}=Dimensions.get("window")
const DataNotFound = ({func , title}) => {
  return (
    <View style={styles.container}>
          <View
            style={styles.view}>
            <DataNot />
            <Text
              style={styles.text}>
              Data not found
            </Text>
            <TouchableOpacity
              onPress={func}
              style={styles.btn}>
              <Text style={{color: 'white', fontSize: 16,...styleText.bold}}>
                {title}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
  )
}

export default DataNotFound

const styles = StyleSheet.create({
    view:{
      justifyContent: 'center',
      flexDirection: 'colunm',
      alignItems: 'center',
      marginVertical: '50%',
    },
    text:{
      marginTop: '2%',
      fontSize: 24,
      color: '#595F69',
      ...styleText.bold
    },
    btn:{
      marginTop: '5%',
      alignItems: 'center',
      height: '20%',
      width: width / 2,
      justifyContent: 'center',
      borderRadius: 10,
      backgroundColor: '#EFA44A',
    },
    container:{
      height:"100%"
    }
})