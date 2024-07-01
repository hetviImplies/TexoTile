import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useRef } from 'react'
import Toast from './Toast'

const Demo = () => {
  const toastRef = useRef(null)
  return (
    <View>
      <Toast ref={toastRef} />
      <Button title='click' onPress={()=> toastRef.current.success('Success message')}></Button>
    </View>
  )
}

export default Demo

const styles = StyleSheet.create({})