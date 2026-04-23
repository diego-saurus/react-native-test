import { useThemeColor } from "@/hooks/use-theme-color"
import { View, type ViewProps } from "react-native"

export type ThemedViewProps = ViewProps

const ThemedView = ({ style, ...otherProps }: ThemedViewProps) => {
  const backgroundColor = useThemeColor("background")

  return <View style={[{ backgroundColor }, style]} {...otherProps} />
}

export default ThemedView
