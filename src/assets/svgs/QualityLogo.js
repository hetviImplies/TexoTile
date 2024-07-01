import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Path, Svg } from 'react-native-svg'

const QualityLogo = (props) => {
  return (
    <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={23}
    height={31}
    fill="none"
    {...props}
  >
    <Path
      stroke={props.color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.1}
      d="M13.404 1.714a2.758 2.758 0 0 0 2.388.769c1.502-.245 2.917.773 3.145 2.264.066.428.234.834.49 1.184.257.35.595.635.986.83a2.696 2.696 0 0 1 1.201 3.663 2.688 2.688 0 0 0 0 2.489c.7 1.34.16 2.987-1.2 3.664a2.73 2.73 0 0 0-.986.829c-.257.35-.425.756-.49 1.184-.23 1.491-1.644 2.51-3.146 2.265a2.757 2.757 0 0 0-2.388.768 2.75 2.75 0 0 1-3.887 0 2.757 2.757 0 0 0-2.388-.769c-1.502.246-2.917-.773-3.146-2.264a2.69 2.69 0 0 0-.49-1.184 2.73 2.73 0 0 0-.985-.83 2.696 2.696 0 0 1-1.202-3.663 2.688 2.688 0 0 0 0-2.489A2.696 2.696 0 0 1 2.508 6.76a2.73 2.73 0 0 0 .985-.829 2.69 2.69 0 0 0 .49-1.184c.23-1.49 1.644-2.51 3.146-2.264a2.757 2.757 0 0 0 2.388-.77 2.75 2.75 0 0 1 3.887 0Z"
    />
    <Path
      stroke={props.color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.1}
      d="M17.501 20.583c.449 1.986 1.415 4.58 3.471 7.24l-4.427-1.482-1.831 3.142c-1.537-2.36-2.427-4.888-2.94-7.073m-6.3-1.8c-.452 1.982-1.418 4.565-3.465 7.213l4.427-1.482 1.832 3.142c1.535-2.358 2.424-4.884 2.938-7.067M11.46 17.864c3.452 0 6.251-2.774 6.251-6.195 0-3.422-2.799-6.195-6.251-6.195-3.453 0-6.251 2.773-6.251 6.195 0 3.421 2.798 6.195 6.25 6.195Z"
    />
    <Path
      stroke={props.color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.1}
      d="m9.247 11.49 1.596 1.582 2.831-2.806"
    />
  </Svg>
  )
}

export default QualityLogo

const styles = StyleSheet.create({})