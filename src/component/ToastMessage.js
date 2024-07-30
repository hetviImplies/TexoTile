import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Toast from 'react-native-toast-message';
import { Black, White } from '../Global_Com/color';

const ToastMessage = () => {

    const ShowToast = () =>{
        Toast.show('This is a toast message', {
          type: 'info',
  position: 'top',
  duration: 3000,
  styles:{

  },
  backgroundColor: Black,
  color: White,
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