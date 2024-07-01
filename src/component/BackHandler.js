import { StyleSheet, Text, View , Alert , BackHandler} from 'react-native'
import React from 'react'

const Backhandler = () => {
    const backAction = () => {
        Alert.alert('Hold on!', 'Are you sure you want to go back?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {text: 'YES', onPress: () => BackHandler.exitApp()},
        ]);
        return true;
      };

      const backHandler = BackHandler.addEventListener('hardwareBackPress',backAction);
      return () => backHandler.remove();
}

export default Backhandler

const styles = StyleSheet.create({})