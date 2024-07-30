import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { styleText } from '../assets/fonts/Fonts'
import { Accepted, Pending, Rejected } from '../assets/svgs/svg'
import { Black } from '../Global_Com/color'
const UserStatus = ({type,main,sub}) => {
  return (
    <View style={styles.container}>
      <View style={{flex: 1, justifyContent: "center", alignItems: "center",width:"70%"}}>
        <View style={{marginBottom: "10%"}}>
         {type==='pending' ? <Pending /> : type==="rejected" ? <Rejected/> : type==="Accepted" ? <Accepted/> : null}
        </View>
        <Text style={{color: Black, marginVertical: "5%", lineHeight: 33, textAlign: "center",...styleText.bold, fontSize: 24}}>
          {main}
        </Text>
        <Text style={{color: "rgba(86, 90, 112, 0.5)", lineHeight: 24, textAlign: "center",...styleText.semiBold, fontSize: 16}}>
          {sub}
        </Text>
      </View>
    </View>
  )
}

export default UserStatus

const styles = StyleSheet.create({
    container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})