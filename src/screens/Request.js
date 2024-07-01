import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Pending_Request from '../assets/svgs/Pending_Request'
import { styleText } from '../assets/fonts/Fonts'
import { useDispatch } from 'react-redux';
import { Logout } from '../Slice/LoginAuthSlice';
import UserStatus from '../component/UserStatus';
import axios from 'axios';
import { URL } from '../URLs/URL';
import { EndPoints } from '../URLs/EndPoints';
const {height, width} = Dimensions.get('window');
const Request = (props) => {
  const [index,setIndex]=useState(2)
  const dispatch=useDispatch()
  const HandlePress = async() => {
    try {
      const response = await axios
        .get(`${URL}${EndPoints.GetProfile}`)
        .then(res => {
          console.log('res.data.result: ', res.data);
          if(res.data.result.company_owner===false && !res.data.result.role){
              setIndex(0)
          }else if(res.data.result.company_owner===null){
            setIndex(1)
          }else if(res.data.result.role){
            setIndex(2)
            props.navigation.navigate("Tabs")
          }
          return res.data.result;
        })
    } catch (error) {

    }
  }

  useEffect(()=>{
    HandlePress()
  },[])
  return (
    <View style={styles.container}>
     {index===0 ? <UserStatus type="pending" main="Your Request has been Pending" sub="Your request is now waiting for approval. You'll be notified when your request has been approved" />
     : index===1 ?
     <UserStatus type="rejected" sub="Your request rejected by company admin. So, please contact company admin."/>
     : index===2 ?
     <UserStatus type="Accepted" main="Your Request has been Pending" sub="Your request is now waiting for approval. You'll be notified when your request has been approved" /> : null
     }
     <TouchableOpacity onPress={()=>props.navigation.navigate("Category")} style={{borderWidth: 0, height: height/16, width:width/1.2, borderRadius: 10, alignItems: "center", justifyContent: "center",backgroundColor:"#E89E46",marginBottom:"5%",alignItems: "center", justifyContent: "center"}}>
      <Text style={{color:"white"}}>Add / Join company</Text>
     </TouchableOpacity>
      <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: "5%",borderWidth:0,width:width/1.2}}>
        <TouchableOpacity onPress={HandlePress} style={{borderWidth: 0, height: height/16, width: "45%", borderRadius: 10, alignItems: "center", justifyContent: "center",backgroundColor:"rgba(234, 234, 234, 1)"}}>
          <Text style={{color:"black"}}>Status</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{
          dispatch(Logout()).then(async a => {
            if (a.meta.requestStatus == 'fulfilled') {
               props.navigation.reset({
            index: 0,
            routes: [{ name: 'Quality' }]
          });
              return props.navigation.navigate('Login');
            }
          });
        }} style={{borderWidth: 0,backgroundColor:"#E89E46", height: height/16, width: "45%", borderRadius: 10, alignItems: "center", justifyContent: "center"}}>
          <Text style={{color:"white",fontSize:19}}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Request

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});