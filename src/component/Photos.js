import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Add_Photo, Close_Red} from '../assets/svgs/svg';
import {
  Black,
  Border_Color,
  Photo_Background_Color,
  TextInput_Border_Color,
} from '../Global_Com/color';
const {height, width} = Dimensions.get('window');
const Photos = ({title, onPress, photo, onPressDelete}) => {

  return (
    <TouchableOpacity onPress={onPress} style={styles.main_view}>
      {photo && photo !== null ? (
        photo?.substring(photo?.lastIndexOf('.') + 1) === 'jpg' ||
        photo?.substring(photo?.lastIndexOf('.') + 1) === 'png' ? (
          <Image source={{uri: photo}} style={styles.Image_sub_view}></Image>
        ) : (
          <Image
            source={require('../assets/Image/pdf.jpg')}
            style={styles.Image_sub_view}></Image>
        )
      ) : (
        <View style={styles.sub_view}>
          <Add_Photo height={"50%"} width={"50%"} Opacity={"6%"} />
        </View>
      )}
      <Text style={styles.text}>{title}</Text>
      {photo === '' || photo === null || photo === undefined ? null : (
        <TouchableOpacity
          onPress={onPressDelete}
          style={{position: 'absolute', top: -5, right: 3}}>
          <Close_Red height={25} width={25} fill={'white'} />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

export default Photos;

const styles = StyleSheet.create({
  main_view: {
    borderWidth: 0,
    height: height / 4,
    width: width / 2.28,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: '2%',
  },
  sub_view: {
    borderWidth: 1.5,
    height: '85%',
    width: '90%',
    borderRadius: 15,
    borderColor: TextInput_Border_Color,
    backgroundColor: Photo_Background_Color,
    alignItems:"center",
    justifyContent:"center"
  },
  Image_sub_view: {
    borderWidth: 1.5,
    height: '85%',
    width: '90%',
    borderRadius: 15,
    borderColor: TextInput_Border_Color,
  },
  text: {
    color: Black,
    marginTop: '2%',
    fontSize: 15,
    fontWeight: '600',
  },
});
