import { View, Text } from 'react-native'
import React from 'react'
import { Path, Svg } from 'react-native-svg'

const Profile = (props) => {
  return (
    <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={28}
    fill="none"
    {...props}
  >
    <Path
      stroke={props.color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M9.607 12.685a2.36 2.36 0 0 0-.422 0c-3.043-.101-5.46-2.568-5.46-5.603 0-3.098 2.532-5.615 5.678-5.615 3.133 0 5.678 2.517 5.678 5.615-.013 3.035-2.43 5.502-5.474 5.603ZM3.213 17.352C.12 19.4.12 22.739 3.213 24.775c3.517 2.327 9.285 2.327 12.801 0 3.095-2.049 3.095-5.387 0-7.423-3.504-2.315-9.271-2.315-12.8 0Z"
    />
  </Svg>
  )
}

export default Profile