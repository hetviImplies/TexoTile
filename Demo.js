import {
  Alert,
  Button,
  Image,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Toast from './Toast';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
// import { getSystemVersion } from 'react-native-device-info';
import {pick, types, isCancel} from 'react-native-document-picker';
import {TextInput} from 'react-native-paper';
const Demo = () => {
  const [image, setImage] = useState(null);
  const [cameraPermission, setCameraPermission] = useState(null);
  const [galleryPermission, setGalleryPermission] = useState(null);
useEffect(()=>{
  console.log('galleryPermission: ', galleryPermission);
  console.log('cameraPermission: ', cameraPermission);

},[galleryPermission,cameraPermission])

const requestPermissions = async (callback) =>{
  if (Platform.OS === 'android') {
      const cameraPermissionStatus = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'This app needs access to your camera',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      if (cameraPermissionStatus === 'granted') {
        setCameraPermission(true);
        callback(true);
      } else {
        setCameraPermission(false);
        callback(false);
      }
      console.log('cameraPermissionStatus: ', cameraPermissionStatus);
    } else {
      // iOS permission handling
      const cameraPermissionStatus = await ImagePicker.requestCameraPermission();
      const galleryPermissionStatus = await ImagePicker.requestPhotoLibraryPermission();

      if (cameraPermissionStatus === 'granted') {
        setCameraPermission(true);
        callback(true);
      } else {
        setCameraPermission(false);
        callback(false);
      }
      if (galleryPermissionStatus === 'granted') {
        setGalleryPermission(true);
      } else {
        setGalleryPermission(false);
      }
    }
  };

  const handleTakePhoto = async() => {
    if (!cameraPermission) {
      await requestPermissions((granted) => {
        if (granted) {
          const options = {
            title: 'Take a Photo',
            takePhotoButtonTitle: 'Take a Photo',
            mediaType: 'photo',
            storageOptions: {
              skipBackup: true,
              path: 'images',
            },
          };

          launchCamera(options, (response) => {
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else {
              const source = { uri: response.assets[0].uri };
              console.log('response.uri: ', response.assets[0].uri);
              setImage(source);
            }
          });
        } else {
          Alert.alert('Camera permission denied');
        }
      });
    } else {
      const options = {
        title: 'Take a Photo',
        takePhotoButtonTitle: 'Take a Photo',
        mediaType: 'photo',
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };

      launchCamera(options, (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else {
          const source = { uri: response.assets[0].uri };
          console.log('response.uri: ', response.assets[0].uri);
          setImage(source);
        }
      });
    }
  };

  const requestPermissionsGellary = async (callback) =>{
    const galleryPermissionStatus = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: 'Gallery Permission',
        message: 'This app needs access to your gallery',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      }
    );
    if (galleryPermissionStatus === 'granted') {
      setGalleryPermission(true);
      callback(true);
    } else {
      setGalleryPermission(false);
      callback(false);
    }
    console.log('galleryPermissionStatus: ', galleryPermissionStatus);
  }

  const handleChoosePhoto = async () => {
    if (!galleryPermission) {
      await requestPermissionsGellary((granted) => {
        if (granted) {
          const options = {
            title: 'Select Image',
            storageOptions: {
              skipBackup: true,
              path: 'images',
            },
          };
          launchImageLibrary(options, (response) => {
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
              const source = { uri: response.assets[0].uri };
              setImage(source);
            }
          });
        } else {
          Alert.alert('Gallery permission denied');
        }
      });
    } else {
      const options = {
        title: 'Select Image',
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };
      launchImageLibrary(options, (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          const source = { uri: response.assets[0].uri };
          setImage(source);
        }
      });
    }
  }







  const requestDocumentWithPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        // In android 13 no permission is needed
        const deviceVersion = Platform.Version;
        // const deviceVersion = getSystemVersion();
        let granted = PermissionsAndroid.RESULTS.DENIED;
        if (deviceVersion >= 13) {
          granted = PermissionsAndroid.RESULTS.GRANTED;
        } else {
          granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
          );
        }
        console.log('granted: ', granted);
        if (granted) {

          return pickDocument();
        }
      } else {
        // Handle iOS permissions if needed
        return pickDocument();
      }
    } catch (error) {
      console.log('Error checking/requesting permissions:', error);
      return null;
    }
  };



  const PDF=async()=>{
    const response = await requestDocumentWithPermission();
    Alert.alert(JSON.stringify(response));
  }

  const [pdf,setPdf]=useState()

  return (
    <View>
      <Button title="Choose from Gallery" onPress={handleChoosePhoto} />
      <Button title="Take a Photo" onPress={handleTakePhoto} />
      {/* <Button title="Take a permision" onPress={requestPermissions} /> */}
      {image && (
        <Image source={image} style={{ width: 300, height: 300 }} />
      )}
      {/* <Button title="Take a permision" onPress={PDF} /> */}
      {/* <TextInput
      mode="outlined"
        onSubmitEditing={() => emailInput.focus()}
        returnKeyLabel="next"
        returnKeyType="next"
      />
      <TextInput
      mode="outlined"
        returnKeyLabel="next"
        returnKeyType="next"
        ref={input => (emailInput = input)}
        onSubmitEditing={() => emailInput1.focus()}
      />
      <TextInput returnKeyLabel="next" returnKeyType="done" ref={input => (emailInput1 = input)} /> */}
    </View>
  );
};

export default Demo;

const styles = StyleSheet.create({});
