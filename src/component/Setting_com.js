import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import User from '../assets/svgs/User';
import Right_arrow from '../assets/svgs/Right_arrow';
import Company from '../assets/svgs/Company';
import LogOut from '../assets/svgs/LogOut';

const {height, width} = Dimensions.get('window');
const Setting_com = ({title, func}) => {
  const Logo = () => {
    if (title == 'Account') {
      return <User />;
    } else if (title == 'Company Information') {
      return <Company />;
    } else if (title == 'Logout') {
      return <LogOut />;
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
        }}>
        <View style={{flexDirection: 'row', width: width / 2}}>
          <View style={{marginRight: '5%'}}>{Logo()}</View>
          <Text style={{color: '#2D303D', fontSize: 14}}>{title}</Text>
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
        height: height / 16,
        width: width / 1.1,
        borderRadius: 10,
        backgroundColor: 'white',
        shadowColor: '#000',
        backgroundColor: 'white',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.8,
        shadowRadius: 1,
        elevation: 5,
        justifyContent: 'center',
      }
});
