import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Path, Svg } from 'react-native-svg'

const YarnLogo = (props) => {
  return (
    <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={27}
    height={28}
    fill="none"
    {...props}
  >
    <Path
      stroke={props.color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      d="M24.835 7.005c2.045 4.15 1.397 9.365-1.944 12.84-4.145 4.31-10.866 4.31-15.011 0m0 0c-4.146-4.311-4.146-11.3 0-15.612C11.353.621 16.636.035 20.696 2.478M7.88 19.845 5.154 22.68m6.16-3.54c-2.322-1.443-3.877-4.083-3.877-7.1 0-4.565 3.559-8.266 7.948-8.266 4.39 0 7.948 3.701 7.948 8.266a8.543 8.543 0 0 1-.495 2.88m-11.524 4.22a7.682 7.682 0 0 0 4.071 1.166c1.488 0 2.88-.425 4.071-1.166v-4.127c0-.745-.58-1.348-1.296-1.348h-5.55c-.716 0-1.296.603-1.296 1.348v4.127Zm-9.818 7.344a1.811 1.811 0 0 1 0-2.49l3.767-3.917 2.394 2.49-3.767 3.917a1.648 1.648 0 0 1-2.394 0ZM18.688 10.23c0 1.897-1.479 3.435-3.303 3.435-1.824 0-3.303-1.538-3.303-3.435 0-1.898 1.479-3.435 3.303-3.435 1.824 0 3.303 1.537 3.303 3.435Z"
    />
  </Svg>
  )
}

export default YarnLogo

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    }
})