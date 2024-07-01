import { View, Text } from 'react-native'
import React from 'react'
import { Path, Svg } from 'react-native-svg'

const Message = (props) => {
  return (
    <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={18}
    fill="none"
    {...props}
  >
    <Path
      stroke="#2D303D"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m14.918 6.376-3.703 3.01c-.7.556-1.684.556-2.383 0l-3.734-3.01"
    />
    <Path
      stroke="#2D303D"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M14.09 16.5c2.535.007 4.243-2.075 4.243-4.635V6.142c0-2.56-1.708-4.642-4.243-4.642H5.91c-2.535 0-4.243 2.082-4.243 4.642v5.723c0 2.56 1.708 4.642 4.243 4.635h8.181Z"
      clipRule="evenodd"
    />
  </Svg>
  )
}

export default Message