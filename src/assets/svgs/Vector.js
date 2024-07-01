import * as React from "react"
import Svg, { Path, G, Defs, ClipPath } from "react-native-svg"
const Vector = (props) => (
    <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={8}
    height={6}
    fill="none"
    {...props}
  >
    <Path
      fill="#2D303D"
      d="M4 5.059a.55.55 0 0 1-.38-.148L.334 1.805a.486.486 0 0 1 0-.716.558.558 0 0 1 .757 0L4 3.838l2.909-2.749a.558.558 0 0 1 .757 0c.21.198.21.518 0 .716L4.378 4.91a.55.55 0 0 1-.379.148Z"
    />
  </Svg>
)
export default Vector
