import { ActivityIndicator, Dimensions, Modal, StyleSheet, Text, View } from 'react-native'
import React from 'react'
const {height,width}=Dimensions.get("window")
const Activity_Indicator = () => {
  return (
    <Modal
      transparent={true}
      visible={true}
      animationType="none"
    >
      <View style={styles.backgroundColor}>
        <ActivityIndicator size={40} color={"white"} />
      </View>
    </Modal>
  )
}

export default Activity_Indicator

const styles = StyleSheet.create({
    backgroundColor: {
    height:height,
    alignItems: 'center',
    justifyContent: "center",
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
})