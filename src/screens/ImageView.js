import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {Close_Black, Close_White} from '../assets/svgs/svg';
import {SvgXml} from 'react-native-svg';
import {styleText} from '../assets/fonts/Fonts';
import {Title} from 'react-native-paper';
import Pdf from 'react-native-pdf';
import {Black, White, Yellow} from '../Global_Com/color';
const {height, width} = Dimensions.get('window');

const ImageView = ({route, navigation}) => {
  const {image, Title} = route.params;
  useLayoutEffect(() => {
    if (image.substring(image.lastIndexOf('.') + 1) !== 'jpg') {
      navigation.setOptions(
        {
          headerShown: true,
          headerTitleAlign: 'center',
          headerBackgroundContainerStyle: {
            backgroundColor: Yellow,
          },
          headerTitleStyle: {
            ...styleText.bold,
          },
          title: Title,
          headerTintColor: White,
          headerBackground: () => {},
        },
        [navigation],
      );
    }
  });
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      {image.substring(image.lastIndexOf('.') + 1) === 'jpg' ? (
        <View
          style={{backgroundColor: Black, flex: 1, justifyContent: 'center'}}>
          <TouchableOpacity
            style={{position: 'absolute', top: 70, left: 23}}
            onPress={() => navigation.goBack()}>
            <Close_White height={35} width={35} />
          </TouchableOpacity>
          <Image
            style={{height: height / 1.5, width: width}}
            source={{uri: image}}></Image>
        </View>
      ) : (
        <View style={{backgroundColor: White}}>
          <Pdf
            cache={true}
            trustAllCerts={false}
            source={{uri: image}}
            onLoadComplete={(numberOfPages, filePath) => {
              console.log(`Number of pages: ${numberOfPages}`);
            }}
            onPageChanged={(page, numberOfPages) => {
              console.log(`Current page: ${page}`);
            }}
            onError={error => {
              console.log(error);
            }}
            onPressLink={uri => {
              console.log(`Link pressed: ${uri}`);
            }}
            style={{height: height, width: width}}
          />
        </View>
      )}
    </View>
  );
};

export default ImageView;

const styles = StyleSheet.create({});
