import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

function ChevronLeft(props: SvgProps) {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
      <Path d="M10 13L5 8l5-5" stroke="#000" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  )
}

export default ChevronLeft
