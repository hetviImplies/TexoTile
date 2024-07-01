import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Toast from 'react-native-toast-message';

const ToastMessage = () => {

    const ShowToast = () =>{
        Toast.show('This is a toast message', {
          type: 'info',
  position: 'top',
  duration: 3000,
  styles:{

  },
  backgroundColor: '#2D303D',
  color: '#FFFFFF',
  fontSize: 16,
        });
      }
      useEffect(()=>{
        ShowToast()
      },[])
  return (
    <Toast/>
  )
}

export default ToastMessage

const styles = StyleSheet.create({})