import { ActivityIndicator, Dimensions, Modal, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { White } from '../Global_Com/color'
import { hp } from '../Global_Com/responsiveScreen'
const Activity_Indicator = () => {
  return (
    <Modal
      transparent={true}
      visible={true}
      animationType="none"
    >
      <View style={styles.backgroundColor}>
        <ActivityIndicator size={40} color={White} />
      </View>
    </Modal>
  )
}

export default Activity_Indicator

const styles = StyleSheet.create({
    backgroundColor: {
    height:hp(100),
    alignItems: 'center',
    justifyContent: "center",
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
})