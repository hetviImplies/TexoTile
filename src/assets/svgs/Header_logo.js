import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"
const Header_logo = (props) => {
  return (
    <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={79}
    height={80}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        fill="#fff"
        d="M52.366 57.084c1.455-1.606 2.753-2.914 3.909-4.334.582-.713 1.111-1.037 2.066-.975 2.575.17 4.479 1.423 5.986 3.435 1.746 2.31 3.751 4.236 6.595 5.058.69.2 1.385.368 2.232.59a36.97 36.97 0 0 1-7.226 8.858C58 76.863 48.679 80.339 38.103 79.97 19.292 79.317 3.818 65.65.623 47.15-2.869 26.979 8.521 8.087 27.478 1.918c22.182-7.215 45.754 6.62 50.638 29.754 1.915 9.091.733 17.823-3.23 26.201-.519 1.093-1.141 1.4-2.274 1.128-2.438-.589-4.557-1.708-6.07-3.756-2.017-2.725-4.345-4.881-7.904-5.161-.122 0-.233-.15-.434-.295 2.712-5.647 3.149-11.453.923-17.363a19.516 19.516 0 0 0-5.681-8.199c-1.903 1.806-3.713 3.497-5.48 5.23-.252.288-.39.66-.384 1.045.21 8.508.978 16.928 4.019 24.97.157.398.37.775.765 1.612ZM42.314 33.79c-7.42 4.543-15.063 8.116-23.627 9.851.372 1.332.625 2.525 1.053 3.65.227.53.625.967 1.13 1.238 6.838 3.467 13.991 5.049 21.654 3.7 1.202-.212 1.502-.536 1.269-1.786a77.953 77.953 0 0 1-1.062-7.7c-.248-2.879-.28-5.771-.417-8.953ZM21.39 50.405c4.121 9.15 16.94 13.442 25.223 9.427-.632-1.844-1.316-3.673-1.874-5.538-.291-.963-.748-1.179-1.691-.99a31.783 31.783 0 0 1-14.528-.569c-2.4-.636-4.738-1.54-7.13-2.33Zm22.58-31.03C32.702 16.389 21.51 25 20.005 32.974c8.867-2.866 16.827-7.2 23.965-13.598Zm8.405 4.048c-2.055-2-2.07-1.985-3.926-.389A81.295 81.295 0 0 1 20.331 38.89c-2.093.681-2.27.96-1.522 3.536 12.959-3.114 24.335-8.983 33.566-19.002Zm-3.585-2.321c-2.78-1.691-2.867-1.703-4.991.094A66.97 66.97 0 0 1 21.067 33.89c-2.092.684-2.619 1.591-2.252 4.24A80.846 80.846 0 0 0 48.79 21.101Zm-2.38 9.828c-1.776.945-2.856 1.823-2.85 3.891 0 5.462.291 10.882 1.574 16.203.606 2.51 1.531 4.94 2.328 7.4.268.825.78 1.06 1.557.563.716-.457 1.456-.884 2.145-1.29-3.538-8.635-4.447-17.523-4.755-26.768Z"
      />
      <Path
        fill="#E89E46"
        d="M42.313 33.79c.137 3.181.17 6.074.416 8.953.226 2.583.58 5.153 1.063 7.7.233 1.25-.067 1.574-1.27 1.786-7.662 1.349-14.815-.233-21.654-3.7a2.537 2.537 0 0 1-1.129-1.238c-.428-1.125-.68-2.318-1.053-3.65 8.567-1.735 16.206-5.308 23.627-9.851Z"
      />
      <Path
        fill="#E89E46"
        d="M21.39 50.405c2.393.79 4.73 1.682 7.13 2.333a31.782 31.782 0 0 0 14.528.569c.943-.183 1.4.026 1.691.99.559 1.864 1.243 3.694 1.874 5.538-8.282 4.012-21.104-.28-25.222-9.43ZM43.971 19.376c-7.138 6.398-15.098 10.732-23.965 13.598 1.504-7.978 12.697-16.586 23.965-13.598ZM52.374 23.423C43.144 33.44 31.767 39.311 18.808 42.42c-.748-2.57-.582-2.849 1.522-3.535a81.296 81.296 0 0 0 28.118-15.855c1.857-1.591 1.872-1.606 3.926.394Z"
      />
      <Path
        fill="#E89E46"
        d="M48.79 21.102a80.847 80.847 0 0 1-29.974 17.027c-.37-2.651.16-3.555 2.252-4.239A66.969 66.969 0 0 0 43.8 21.196c2.124-1.797 2.212-1.797 4.99-.094ZM46.409 30.93c.308 9.244 1.205 18.132 4.758 26.757-.693.413-1.429.834-2.145 1.29-.777.499-1.29.263-1.557-.562-.8-2.46-1.726-4.89-2.328-7.4-1.278-5.303-1.566-10.732-1.574-16.203-.012-2.059 1.07-2.937 2.846-3.883Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h79v80H0z" />
      </ClipPath>
    </Defs>
  </Svg>
  )
}

export default Header_logo

const styles = StyleSheet.create({})