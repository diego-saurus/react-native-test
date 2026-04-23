import { useToTheme } from "@/hooks/use-to-theme"
import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

function HouseIcon(props: SvgProps) {
  const { toTheme } = useToTheme()

  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
      <Path
        d="M13.675 6.481l-5-4.544a1 1 0 00-1.35 0l-5 4.544A1 1 0 002 7.22v5.756A.995.995 0 003 14h3a.5.5 0 00.5-.5v-3A.5.5 0 017 10h2a.5.5 0 01.5.5v3a.5.5 0 00.5.5h3c.166.001.33-.04.475-.119A1.005 1.005 0 0014 13V7.219a1 1 0 00-.325-.738z"
        fill={toTheme("primary")}
      />
    </Svg>
  )
}

export default HouseIcon
