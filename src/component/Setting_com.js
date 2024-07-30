import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { styleText } from '../assets/fonts/Fonts';
import { InfoError, Right_arrow, SignOut, UserLogo } from '../assets/svgs/svg';
import { hp, wp } from '../Global_Com/responsiveScreen';
import { Black, White } from '../Global_Com/color';
const {height, width} = Dimensions.get('window');
const Setting_com = ({title, func}) => {
  const Logo = () => {
    if (title == 'Account') {
      return <UserLogo height={hp(2.3)} width={hp(2.3)}/>;
    } else if (title == 'Company Information') {
      return <InfoError height={hp(2.3)} width={hp(2.3)} />;
    } else if (title == 'Logout') {
      return <SignOut height={hp(2.3)} width={hp(2.3)}/>;
    }
  };

  const RighArrow = () => {
    if (title == 'Account' || title == 'Company Information') {
      return <Right_arrow />;
    }
  };
  return (
    <TouchableOpacity
      onPress={func}
      style={styles.btn}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: '4%',
          alignItems:"center"
        }}>
        <View style={{flexDirection: 'row', width: wp(50)}}>
          <View style={{marginRight: '5%',marginTop:"1%"}}>{Logo()}</View>
          <Text style={{color: Black, fontSize: hp(2),...styleText.medium}}>{title}</Text>
        </View>
        <View>{RighArrow()}</View>
      </View>
    </TouchableOpacity>
  );
};

export default Setting_com;

const styles = StyleSheet.create({
    btn:{
        borderWidth: 0,
        marginTop: '4%',
        height: hp(7),
        width: wp(90),
        borderRadius: 10,
        backgroundColor: White,
        shadowColor: '#000',
        backgroundColor: White,
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.8,
        shadowRadius: 1,
        elevation: 5,
        justifyContent: 'center',
      }
});
