import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Path, Svg } from 'react-native-svg'

const EditUser = (props) => {
  return (
    <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={30}
    fill="none"
    {...props}
  >
    <Path
      stroke="#EFA44A"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.75}
      d="M15 29c7.733 0 14-6.268 14-14S22.734 1 15 1C7.268 1 1 7.268 1 15s6.268 14 14 14Z"
    />
    <Path
      fill="#EFA44A"
      d="m15.874 11.207 2.904 2.908-5.229 5.232-2.904-2.907 5.229-5.233ZM19.561 13.346l-2.905-2.91L18.096 9 21 11.903l-1.438 1.443ZM12.646 20.27 9 21l.728-3.648 2.918 2.918Z"
    />
  </Svg>
  )
}

export default EditUser

const styles = StyleSheet.create({})