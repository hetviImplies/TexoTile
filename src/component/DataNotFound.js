import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import { styleText } from '../assets/fonts/Fonts'
import { ConditionContext } from '../screens/ConditionContext'
import { hp, wp } from '../Global_Com/responsiveScreen'
import { Grey, White, Yellow } from '../Global_Com/color'
import { DataNotFoundLogo } from '../assets/svgs/svg'
const DataNotFound = ({func , title,search}) => {
  const { condition } = useContext(ConditionContext);
  return (
    <View style={styles.container}>
          <View
            style={styles.view}>
            <DataNotFoundLogo height={hp(30)} width={hp(30)}/>
            <Text
              style={styles.text}>
              Data not found
            </Text>
            {(search || search==='') || condition==='view' ? null :
            <TouchableOpacity
              onPress={func}
              style={styles.btn}>
              <Text style={{color: White, fontSize: 16,...styleText.bold}}>
                {title}
              </Text>
            </TouchableOpacity>}
          </View>
        </View>
  )
}

export default DataNotFound

const styles = StyleSheet.create({
    view:{
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection:"column",
      marginVertical:"30%"
    },
    text:{
      fontSize: hp(3),
      color: Grey,
      ...styleText.bold
    },
    btn:{
      marginTop: '5%',
      alignItems: 'center',
      height: hp(7),
      width: wp(45),
      justifyContent: 'center',
      borderRadius: 10,
      backgroundColor:Yellow,
    },
    container:{
      flex:1
    }
})