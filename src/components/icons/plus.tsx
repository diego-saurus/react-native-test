import { useToTheme } from "@/hooks/use-to-theme"
import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

function PlusIcon(props: SvgProps) {
  const { toTheme } = useToTheme()

  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
      <Path
        d="M2.5 8h11M8 2.5v11"
        stroke={toTheme("background")}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default PlusIcon
