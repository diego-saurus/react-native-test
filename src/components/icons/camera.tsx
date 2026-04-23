import { useToTheme } from "@/hooks/use-to-theme"
import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

function CameraIcon(props: SvgProps) {
  const { toTheme } = useToTheme()

  return (
    <Svg width={32} height={32} viewBox="0 0 32 32" fill="none" {...props}>
      <Path
        d="M26 7h-3.462l-1.7-2.55A.988.988 0 0020 4h-8a.988.988 0 00-.838.45L9.463 7H6a3.012 3.012 0 00-3 3v14a3.013 3.013 0 003 3h20a3.013 3.013 0 003-3V10a3.013 3.013 0 00-3-3zm-5.5 9.5a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z"
        fill={toTheme("primary")}
      />
    </Svg>
  )
}

export default CameraIcon
