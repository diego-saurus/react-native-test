import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

function MagnifyingGlassIcon(props: SvgProps) {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
      <Path
        d="M7.25 12.5a5.25 5.25 0 100-10.5 5.25 5.25 0 000 10.5zM10.963 10.963L14 14"
        stroke="#000"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default MagnifyingGlassIcon
